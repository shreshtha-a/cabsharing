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

  <div className="conversation-card active">

    <div className="avatar-wrapper">

        <div className="avatar">R</div>

        <span className="online-dot"></span>

    </div>

    <div className="conversation-info">

        <div className="conversation-top">

            <h4>Rahul Sharma</h4>

            <span>2m</span>

        </div>

        <p>Hey! I'll reach in 10 mins.</p>

    </div>

    <div className="unread-count">
        2
    </div>

</div>

  <div className="conversation-card">

    <div className="avatar">P</div>

    <div className="conversation-info">

      <h4>Priya Singh</h4>

      <p>See you at the pickup point.</p>

    </div>

    <span>5m</span>

  </div>

  <div className="conversation-card">

    <div className="avatar">A</div>

    <div className="conversation-info">

      <h4>Aman Verma</h4>

      <p>Thanks for the ride!</p>

    </div>

    <span>Yesterday</span>

  </div>
  <div className="conversation-card">

    <div className="avatar-wrapper">
        <div className="avatar">N</div>
        <span className="online-dot"></span>
    </div>

    <div className="conversation-info">
        <div className="conversation-top">
            <h4>Neha Kapoor</h4>
            <span>11m</span>
        </div>

        <p>I'll be there in 5 minutes.</p>
    </div>

    <div className="unread-count">1</div>

</div>

<div className="conversation-card">

    <div className="avatar-wrapper">
        <div className="avatar">S</div>
    </div>

    <div className="conversation-info">
        <div className="conversation-top">
            <h4>Sneha Gupta</h4>
            <span>1h</span>
        </div>

        <p>Thanks for today's ride 😊</p>
    </div>

</div>

<div className="conversation-card">

    <div className="avatar-wrapper">
        <div className="avatar">A</div>
        <span className="online-dot"></span>
    </div>

    <div className="conversation-info">
        <div className="conversation-top">
            <h4>Aditya Mehra</h4>
            <span>Yesterday</span>
        </div>

        <p>Can you pick me up near Gate 2?</p>
    </div>
</div>

<div className="conversation-card">

    <div className="avatar-wrapper">
        <div className="avatar">M</div>
    </div>

    <div className="conversation-info">
        <div className="conversation-top">
            <h4>Muskan Jain</h4>
            <span>Yesterday</span>
        </div>

        <p>Ride confirmed 👍</p>
    </div>

    <div className="unread-count">4</div>

</div>

<div className="conversation-card">

    <div className="avatar-wrapper">
        <div className="avatar">K</div>
    </div>

    <div className="conversation-info">
        <div className="conversation-top">
            <h4>Karan Singh</h4>
            <span>Mon</span>
        </div>

        <p>Let's meet near the metro station.</p>
    </div>

</div>

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

                RS

            </div>
         
            <div className="chat-user-info">

                <h3>Rahul Sharma</h3>

                <p>
                    <span className="status-dot"></span>
                    Online
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