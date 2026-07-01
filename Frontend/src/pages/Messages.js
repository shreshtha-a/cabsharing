import React, { useCallback, useEffect, useRef, useState } from "react";
import backdrop from "../assets/hopin-backdrop.png";
import {
  HiMagnifyingGlass,
  HiAdjustmentsHorizontal,
  HiPhone,
  HiVideoCamera,
  HiEllipsisVertical,
  HiArrowLeft,
  HiPaperAirplane,
  HiPaperClip,
} from "react-icons/hi2";
import api from "../utils/api";
import socket from "../api/socket";
import "./Messages.css";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

function getSenderId(sender) {
  return typeof sender === "string" ? sender : sender?._id;
}

function formatListTime(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMin = Math.floor((now - date) / 60000);

  if (diffMin < 1) return "now";
  if (diffMin < 60) return `${diffMin}m`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;

  const isYesterday =
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

function formatBubbleTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function Messages() {
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [text, setText] = useState("");
  const [onlineIds, setOnlineIds] = useState(new Set());
  const [loadingList, setLoadingList] = useState(true);
  const chatBodyRef = useRef(null);
  const activeConversationRef = useRef(null);

  useEffect(() => {
    activeConversationRef.current = activeConversation;
  }, [activeConversation]);

  // ── Load conversation list ──────────────────────────────
  const loadConversations = useCallback(async () => {
    try {
      const res = await api.get("/messages/conversations");
      setConversations(res.data.conversations || []);
    } catch (err) {
      console.error("Failed to load conversations:", err);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // ── Socket: connect, join personal room, listen for events ──
  useEffect(() => {
    if (!currentUser?._id) return;

    socket.connect();
    socket.emit("join_user", currentUser._id);

    const handleNewMessage = ({ conversationId, message }) => {
      const isActive = activeConversationRef.current?.id === conversationId;

      setConversations((prev) => {
        const exists = prev.some((c) => c.id === conversationId);
        if (!exists) {
          loadConversations();
          return prev;
        }
        return prev
          .map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  lastMessage: message.text,
                  lastMessageAt: message.createdAt,
                  unreadCount: isActive ? 0 : (c.unreadCount || 0) + 1,
                }
              : c
          )
          .sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));
      });

      if (isActive) {
        setMessages((prev) => [...prev, message]);
      }
    };

    const handleStatus = ({ userId, online }) => {
      setOnlineIds((prev) => {
        const next = new Set(prev);
        if (online) next.add(userId);
        else next.delete(userId);
        return next;
      });
    };

    socket.on("new_message", handleNewMessage);
    socket.on("user_status", handleStatus);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("user_status", handleStatus);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?._id, loadConversations]);

  // ── Load messages when a conversation is opened ──────────
  useEffect(() => {
    if (!activeConversation?.id) return;

    (async () => {
      try {
        const res = await api.get(`/messages/${activeConversation.id}`);
        setMessages(res.data.messages || []);
        setConversations((prev) =>
          prev.map((c) => (c.id === activeConversation.id ? { ...c, unreadCount: 0 } : c))
        );
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    })();
  }, [activeConversation?.id]);

  // ── Auto-scroll on new messages ───────────────────────────
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // ── Send message ──────────────────────────────────────────
  const handleSend = async () => {
    const draft = text.trim();
    if (!draft || !activeConversation) return;

    setText("");
    try {
      const res = await api.post(`/messages/${activeConversation.otherUser._id}`, {
        text: draft,
      });
      const sentMessage = res.data.message;
      setMessages((prev) => [...prev, sentMessage]);
      setConversations((prev) =>
        prev
          .map((c) =>
            c.id === activeConversation.id
              ? { ...c, lastMessage: draft, lastMessageAt: sentMessage.createdAt }
              : c
          )
          .sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt))
      );
    } catch (err) {
      console.error("Failed to send message:", err);
      setText(draft); // restore so the user doesn't lose their draft
    }
  };

  const filteredConversations = conversations.filter((c) =>
    c.otherUser?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="messages-page">
      <div className="messages-container">
        {/* LEFT PANEL */}
        <div className="conversation-panel">
          <div className="conversation-header">
            <h2>Messages</h2>
            <p>Your conversations</p>

            <div className="search-container">
              <HiMagnifyingGlass className="search-icon" />
              <input
                className="search-box"
                type="text"
                placeholder="Search messages, users or rides..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="filter-btn">
                <HiAdjustmentsHorizontal />
              </button>
            </div>

            <div className="filter-tabs">
              <button className="active-tab">All</button>
              <button>Rides</button>
              <button>Requests</button>
              <button>Updates</button>
            </div>
          </div>

          <div className="conversation-list">
            {loadingList && <div className="no-results">Loading conversations...</div>}

            {!loadingList &&
              filteredConversations.map((chat) => (
                <div
                  key={chat.id}
                  className={`conversation-card ${
                    activeConversation?.id === chat.id ? "active" : ""
                  }`}
                  onClick={() => setActiveConversation(chat)}
                >
                  <div className="avatar-wrapper">
                    <div className="avatar">{getInitials(chat.otherUser?.name)}</div>
                    {onlineIds.has(chat.otherUser?._id) && <span className="online-dot"></span>}
                  </div>

                  <div className="conversation-info">
                    <div className="conversation-top">
                      <h4>{chat.otherUser?.name}</h4>
                      <span>{formatListTime(chat.lastMessageAt)}</span>
                    </div>
                    <p>{chat.lastMessage || "Say hello 👋"}</p>
                  </div>

                  {chat.unreadCount > 0 && (
                    <div className="unread-count">{chat.unreadCount}</div>
                  )}
                </div>
              ))}

            {!loadingList && filteredConversations.length === 0 && (
              <div className="no-results">No conversations found.</div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="chat-panel">
          {!activeConversation ? (
            <div className="chat-placeholder" style={{ margin: "auto", textAlign: "center" }}>
              <h2>Select a conversation</h2>
              <p>Choose a chat from the left to start messaging.</p>
            </div>
          ) : (
            <>
              <div className="chat-header">
                <div className="chat-user">
                  <button className="back-btn" onClick={() => setActiveConversation(null)}>
                    <HiArrowLeft />
                  </button>

                  <div className="chat-avatar">
                    {getInitials(activeConversation.otherUser?.name)}
                  </div>

                  <div className="chat-user-info">
                    <h3>{activeConversation.otherUser?.name}</h3>
                    <p>
                      <span className="status-dot"></span>
                      {onlineIds.has(activeConversation.otherUser?._id) ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>

                <div className="chat-actions">
                  <button>
                    <HiPhone />
                  </button>
                  <button>
                    <HiVideoCamera />
                  </button>
                  <button>
                    <HiEllipsisVertical />
                  </button>
                </div>
              </div>

              <div className="ride-banner">
                <img src={backdrop} alt="Ride Banner" />
                <div className="banner-fade"></div>
                <div className="today-pill">Today</div>
              </div>

              <div className="chat-body" ref={chatBodyRef}>
                {messages.map((m) => (
                  <div
                    key={m._id}
                    className={`message ${
                      getSenderId(m.sender) === currentUser?._id ? "sent" : "received"
                    }`}
                  >
                    <div className="bubble">
                      {m.text}
                      <span>{formatBubbleTime(m.createdAt)}</span>
                    </div>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="no-results">No messages yet. Say hi 👋</div>
                )}
              </div>

              <div className="chat-input">
                <button className="attach-btn">
                  <HiPaperClip />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button className="send-btn" onClick={handleSend}>
                  <HiPaperAirplane />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
// added the backend of messages