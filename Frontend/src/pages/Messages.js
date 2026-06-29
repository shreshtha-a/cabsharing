import React from "react";
import "./Messages.css";

export default function Messages() {
  return (
    <div className="messages-page">

      <div className="messages-container">

        {/* LEFT PANEL */}
        <div className="conversation-panel">

          <div className="conversation-header">
            <h2>Messages</h2>
            <p>Your conversations</p>
          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="chat-panel">

          <div className="chat-placeholder">

            <h2>Select a Conversation</h2>

            <p>
              Choose a conversation from the left to start chatting.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}