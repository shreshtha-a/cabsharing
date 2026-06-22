import { useState, useRef } from "react";
import { HiCamera } from "react-icons/hi";

import backdrop from "../assets/hopin-backdrop.png";
import profilePic from "../assets/profile.jpg";

export default function ProfileHeroCard() {
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(() => {
    return (
      localStorage.getItem("profileImage") ||
      profilePic
    );
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);

      localStorage.setItem(
        "profileImage",
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "24px",
        padding: "18px 24px",
        marginTop: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* RIGHT LANDSCAPE */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "340px",
          height: "100%",
          backgroundImage: `url(${backdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg,#fff 0%,rgba(255,255,255,0.92) 18%,rgba(255,255,255,0.45) 50%,rgba(255,255,255,0) 100%)",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "120px 280px 1px 380px",
          alignItems: "center",
          gap: "18px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* PROFILE IMAGE */}
        <div
          style={{
            position: "relative",
            width: "110px",
            height: "110px",
          }}
        >
          <div
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid white",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={profileImage}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* ONLINE DOT */}
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "2px",
              width: "14px",
              height: "14px",
              background: "#22c55e",
              borderRadius: "50%",
              border: "3px solid white",
            }}
          />

          {/* CAMERA BUTTON */}
          <div
            onClick={() =>
              fileInputRef.current.click()
            }
            style={{
              position: "absolute",
              bottom: "12px",
              right: "-4px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg,#14B8C4,#0EA5E9)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow:
                "0 8px 20px rgba(14,165,233,0.35)",
            }}
          >
            <HiCamera size={18} />
          </div>

          {/* HIDDEN INPUT */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        {/* USER INFO */}
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "800",
              color: "#08244b",
            }}
          >
            Harsh Sharma ✓
          </h1>

          <div
            style={{
              marginTop: "10px",
              display: "inline-block",
              padding: "7px 14px",
              borderRadius: "999px",
              background: "#e8f8ef",
              color: "#15803d",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            🛡 Verified Rider
          </div>

          <br />

          <div
            style={{
              marginTop: "10px",
              display: "inline-block",
              padding: "7px 14px",
              borderRadius: "999px",
              background: "#e6f8f9",
              color: "#0f766e",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            🚀 Level 3 Explorer
          </div>

          <div
            style={{
              marginTop: "14px",
              height: "7px",
              background: "#e5e7eb",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "62%",
                height: "100%",
                background:
                  "linear-gradient(90deg,#14b8c4,#0f766e)",
              }}
            />
          </div>

          <div
            style={{
              textAlign: "right",
              marginTop: "6px",
              color: "#64748b",
              fontSize: "12px",
            }}
          >
            620 / 1000 XP
          </div>
        </div>

        {/* DIVIDER */}
        <div
          style={{
            width: "1px",
            height: "110px",
            background: "#e5e7eb",
          }}
        />

        {/* STATS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "#e8faf8",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto 8px",
                fontSize: "22px",
              }}
            >
              🚗
            </div>

            <h2 style={{ margin: 0 }}>42</h2>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Rides Completed
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "#fff7e5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto 8px",
                fontSize: "22px",
              }}
            >
              ⭐
            </div>

            <h2 style={{ margin: 0 }}>4.8</h2>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Overall Rating
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "#eafaf0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto 8px",
                fontSize: "22px",
              }}
            >
              ₹
            </div>

            <h2 style={{ margin: 0 }}>
              ₹3,200
            </h2>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Money Saved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}