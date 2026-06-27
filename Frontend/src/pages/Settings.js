import Security from "../components/settings/Security";
import Notifications from "../components/settings/Notifications";
import Safety from "../components/settings/Safety";
import AppPreferences from "../components/settings/AppPreferences";
import PaymentsWallets from "../components/settings/PaymentsWallets";
import Rewards from "../components/settings/Rewards";
import Support from "../components/settings/Support";
import Sustainability from "../components/settings/Sustainability";
import Header from "../components/settings/Header";

export default function settings(){
    return (
            <div
    style={{
        padding: "30px",
        background: "#F8FAFC",
        minHeight: "100vh",
    }}
    >
   <Header />

    <div
        className="settings-grid"
        style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px",
        alignItems: "start",
        }}
    >

        <div
        style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
        }}
        >
        <Security />
        <Notifications />
        <Sustainability />
        <AppPreferences />
        </div>

        <div
        style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
        }}
        >
        <Safety />
        <PaymentsWallets />
        <Rewards />
        <Support />
        </div>
    </div>
    </div>
    );
}