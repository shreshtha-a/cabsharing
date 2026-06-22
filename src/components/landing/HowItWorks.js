import {
  FaSearch,
  FaUsers,
  FaCarSide,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaHeadset,
} from "react-icons/fa";

export default function HowItWorks() {
  const mobile = window.innerWidth < 768;

  return (
    <section
      style={{
        background: "#F8FAFC",
        padding: mobile ? "35px 20px" : "40px 50px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* HEADING */}
        <h2
          style={{
            color: "#061B4D",
            fontSize: mobile ? "24px" : "22px",
            fontWeight: "700",
            marginBottom: "35px",
          }}
        >
          How Hopin Works
        </h2>

        {/* MAIN ROW */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1.2fr 1fr",
            gap: "40px",
            alignItems: "center",
          }}
        >
          {/* LEFT SIDE - FLOW */}
          <div
            style={{
              display: "flex",
              flexDirection: mobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: mobile ? "25px" : "10px",
            }}
          >
            {/* STEP 1 */}
            <div
              style={{
                textAlign: "center",
                maxWidth: "180px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#DDF6F2",
                  color: "#14B8A6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  margin: "0 auto 12px",
                }}
              >
                <FaSearch />
              </div>

              <h4
                style={{
                  margin: 0,
                  color: "#061B4D",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                Search Route
              </h4>

              <p
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                  color: "#64748B",
                  lineHeight: "1.6",
                }}
              >
                Enter your pickup point and destination
              </p>
            </div>

            {!mobile && (
              <div
                style={{
                  width: "70px",
                  borderTop: "2px dashed #8d9299",
                }}
              />
            )}

            {/* STEP 2 */}
            <div
              style={{
                textAlign: "center",
                maxWidth: "180px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#DDF6F2",
                  color: "#14B8A6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  margin: "0 auto 12px",
                }}
              >
                <FaUsers />
              </div>

              <h4
                style={{
                  margin: 0,
                  color: "#061B4D",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                Match & Connect
              </h4>

              <p
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                  color: "#64748B",
                  lineHeight: "1.6",
                }}
              >
                Find or offer a ride that matches you
              </p>
            </div>

            {!mobile && (
              <div
                style={{
                  width: "70px",
                  borderTop: "2px dashed  #8d9299",
                }}
              />
            )}

            {/* STEP 3 */}
            <div
              style={{
                textAlign: "center",
                maxWidth: "180px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#DDF6F2",
                  color: "#14B8A6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  margin: "0 auto 12px",
                }}
              >
                <FaCarSide />
              </div>

              <h4
                style={{
                  margin: 0,
                  color: "#061B4D",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                Travel Together
              </h4>

              <p
                style={{
                  marginTop: "8px",
                  fontSize: "12px",
                  color: "#64748B",
                  lineHeight: "1.6",
                }}
              >
                Enjoy the ride and save money
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - SAFETY */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)",
              gap: "14px",
            }}
          >
            {/* VERIFIED */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                padding: "18px",
                boxShadow: "0 5px 18px rgba(0,0,0,0.05)",
                minHeight: "105px",
              }}
            >
              <FaShieldAlt
                size={24}
                color="#14B8A6"
              />

              <h4
                style={{
                  margin: "12px 0 8px",
                  color: "#061B4D",
                  fontSize: "15px",
                }}
              >
                Verified & Safe
              </h4>

              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#64748B",
                  lineHeight: "1.5",
                }}
              >
                ID verification for your safety.
              </p>
            </div>

            {/* LIVE TRACKING */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                padding: "18px",
                boxShadow: "0 5px 18px rgba(0,0,0,0.05)",
                minHeight: "105px",
              }}
            >
              <FaMapMarkerAlt
                size={24}
                color="#8B5CF6"
              />

              <h4
                style={{
                  margin: "12px 0 8px",
                  color: "#061B4D",
                  fontSize: "15px",
                }}
              >
                Live Tracking
              </h4>

              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#64748B",
                  lineHeight: "1.5",
                }}
              >
                Share your trip in real time.
              </p>
            </div>

            {/* SUPPORT */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                padding: "18px",
                boxShadow: "0 5px 18px rgba(0,0,0,0.05)",
                minHeight: "105px",
              }}
            >
              <FaHeadset
                size={24}
                color="#F59E0B"
              />

              <h4
                style={{
                  margin: "12px 0 8px",
                  color: "#061B4D",
                  fontSize: "15px",
                }}
              >
                24/7 Support
              </h4>

              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#64748B",
                  lineHeight: "1.5",
                }}
              >
                Our support team is always available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}