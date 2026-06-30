import React, { useState } from "react";
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
import "./Messages.css";

export default function Messages() {

  const [activeChat, setActiveChat] = useState({
    name: "Rahul Sharma",
    status: "Online",
    initials: "RS",
  });
  const [search, setSearch] = useState("");
  const chats = [
  {
    id: 1,
    name: "Rahul Sharma",
    initials: "RS",
    status: "Online",
    message: "Hey! I'll reach in 10 mins.",
    time: "2m",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Priya Singh",
    initials: "PS",
    status: "Offline",
    message: "See you at the pickup point.",
    time: "5m",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Aman Verma",
    initials: "AV",
    status: "Offline",
    message: "Thanks for the ride!",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: "Neha Kapoor",
    initials: "NK",
    status: "Online",
    message: "I'll be there in 5 minutes.",
    time: "11m",
    unread: 1,
    online: true,
  },
  {
    id: 5,
    name: "Sneha Gupta",
    initials: "SG",
    status: "Offline",
    message: "Thanks for today's ride 😊",
    time: "1h",
    unread: 0,
    online: false,
  },
  {
    id: 6,
    name: "Aditya Mehra",
    initials: "AM",
    status: "Online",
    message: "Can you pick me up near Gate 2?",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: 7,
    name: "Muskan Jain",
    initials: "MJ",
    status: "Away",
    message: "Ride confirmed 👍",
    time: "Yesterday",
    unread: 4,
    online: false,
  },
  {
    id: 8,
    name: "Karan Singh",
    initials: "KS",
    status: "Offline",
    message: "Let's meet near the metro station.",
    time: "Mon",
    unread: 0,
    online: false,
  },
];
const filteredChats = chats.filter((chat) =>
  chat.name.toLowerCase().includes(search.toLowerCase())
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

  {filteredChats.map((chat) => (

    <div
      key={chat.id}
      className={`conversation-card ${
        activeChat.name === chat.name ? "active" : ""
      }`}
      onClick={() =>
        setActiveChat({
          name: chat.name,
          status: chat.status,
          initials: chat.initials,
        })
      }
    >

      <div className="avatar-wrapper">

        <div className="avatar">
          {chat.initials}
        </div>

        {chat.online && <span className="online-dot"></span>}

      </div>

      <div className="conversation-info">

        <div className="conversation-top">

          <h4>{chat.name}</h4>

          <span>{chat.time}</span>

        </div>

        <p>{chat.message}</p>

      </div>

      {chat.unread > 0 && (
        <div className="unread-count">
          {chat.unread}
        </div>
      )}

    </div>

  ))}
{filteredChats.length === 0 && (
  <div className="no-results">
    No conversations found.
  </div>
)}
</div>

</div> 
        {/* RIGHT PANEL */}

        <div className="chat-panel">

    <div className="chat-header">

        <div className="chat-user">

            <button className="back-btn">

                <HiArrowLeft />

            </button>

            <div className="chat-avatar">

                {activeChat.initials}

            </div>
         
            <div className="chat-user-info">

                <h3>{activeChat.name}</h3>

                <p>
                    <span className="status-dot"></span>
                    {activeChat.status}
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

        <div className="today-pill">
            Today
        </div>

    </div>

    <div className="chat-body">

    <div className="message received">

        <div className="bubble">

            Hi there! 👋

            <span>5:28 PM</span>

        </div>

    </div>

    <div className="message sent">

        <div className="bubble">

            Hi Rahul! 👋

            <span>5:29 PM ✓✓</span>

        </div>

    </div>

    <div className="message sent">

        <div className="bubble">

            Are we still meeting at 6 PM near City Mall?

            <span>5:29 PM ✓✓</span>

        </div>

    </div>

    <div className="message received">

        <div className="bubble">

            Yes, I'm already on my way.

            <span>5:30 PM</span>

        </div>

    </div>

    <div className="message sent">

        <div className="bubble">

            Great! See you soon.

            <span>5:30 PM ✓✓</span>

        </div>

    </div>

</div>
<div className="chat-input">

    <button className="attach-btn">
        <HiPaperClip />
    </button>

    <input
        type="text"
        placeholder="Type a message..."
    />

    <button className="send-btn">
        <HiPaperAirplane />
    </button>

</div>

</div>   {/* chat-panel ends here */}
    </div>
</div>

    

  );
}