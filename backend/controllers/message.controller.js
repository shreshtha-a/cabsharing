const Conversation = require("../models/Conversation.model");
const Message      = require("../models/Message.model");

// ── Get all conversations for the logged-in user ──────────
exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ participants: req.user._id })
      .populate("participants", "name photo role")
      .sort({ lastMessageAt: -1 });

    const results = await Promise.all(
      conversations.map(async (convo) => {
        const otherUser = convo.participants.find(
          (p) => p._id.toString() !== req.user._id.toString()
        );

        const unreadCount = await Message.countDocuments({
          conversation: convo._id,
          receiver: req.user._id,
          isRead: false,
        });

        return {
          id: convo._id,
          otherUser,
          lastMessage: convo.lastMessage,
          lastMessageAt: convo.lastMessageAt,
          unreadCount,
        };
      })
    );

    res.status(200).json({ success: true, conversations: results });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── Get or create a conversation with another user ────────
exports.getOrCreateConversation = async (req, res) => {
  try {
    const { userId: otherUserId } = req.params;

    let convo = await Conversation.findOne({
      participants: { $all: [req.user._id, otherUserId], $size: 2 },
    }).populate("participants", "name photo role");

    if (!convo) {
      convo = await Conversation.create({ participants: [req.user._id, otherUserId] });
      convo = await convo.populate("participants", "name photo role");
    }

    res.status(200).json({ success: true, conversation: convo });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── Get message history for a conversation ────────────────
exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const convo = await Conversation.findById(conversationId);
    if (!convo) {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }
    if (!convo.participants.some((p) => p.toString() === req.user._id.toString())) {
      return res.status(403).json({ success: false, message: "Not part of this conversation" });
    }

    const messages = await Message.find({ conversation: conversationId })
      .populate("sender", "name photo")
      .sort({ createdAt: 1 });

    // Mark messages sent to me as read
    await Message.updateMany(
      { conversation: conversationId, receiver: req.user._id, isRead: false },
      { isRead: true }
    );

    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── Send a message ─────────────────────────────────────────
exports.sendMessage = async (req, res) => {
  try {
    const { userId: receiverId } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: "Message text is required" });
    }
    if (receiverId === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: "Cannot message yourself" });
    }

    let convo = await Conversation.findOne({
      participants: { $all: [req.user._id, receiverId], $size: 2 },
    });

    if (!convo) {
      convo = await Conversation.create({
        participants: [req.user._id, receiverId],
        lastMessage: text.trim(),
        lastMessageAt: new Date(),
        lastSender: req.user._id,
      });
    } else {
      convo.lastMessage = text.trim();
      convo.lastMessageAt = new Date();
      convo.lastSender = req.user._id;
      await convo.save();
    }

    const message = await Message.create({
      conversation: convo._id,
      sender: req.user._id,
      receiver: receiverId,
      text: text.trim(),
    });

    const populatedMessage = await message.populate("sender", "name photo");

    // Real-time push to the receiver, same pattern as booking.controller.js
    const io = req.app.get("io");
    io.to(`user_${receiverId}`).emit("new_message", {
      conversationId: convo._id,
      message: populatedMessage,
    });

    res.status(201).json({
      success: true,
      message: populatedMessage,
      conversationId: convo._id,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};