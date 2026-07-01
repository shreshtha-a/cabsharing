import { useState } from "react";
import { FaCarSide } from "react-icons/fa";
import FormInput from "./FormInput";
import OtpModal from "./OtpModal";
import api from "../../utils/api";

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const ACC_REGEX  = /^\d{9,18}$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialState = {
  name: "", phone: "", email: "",
  vehicleModel: "", vehicleNumber: "", vehicleType: "", color: "",
  licenseNumber: "", experience: "", rcNumber: "",
  accountNumber: "", ifscCode: "", accountHolder: "",
  agree: false,
};

export default function RegistrationForm() {
  const [form, setForm] = useState(initialState);
  const [licensePhoto, setLicensePhoto] = useState(null);
  const [rcPhoto, setRcPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const [otpUserId, setOtpUserId] = useState(null);
  const [otpEmail, setOtpEmail] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!PHONE_REGEX.test(form.phone)) e.phone = "Enter valid 10-digit phone";
    if (!EMAIL_REGEX.test(form.email)) e.email = "Enter valid email";
    if (!form.vehicleModel.trim()) e.vehicleModel = "Required";
    if (!form.vehicleNumber.trim()) e.vehicleNumber = "Required";
    if (!form.vehicleType.trim()) e.vehicleType = "Required";
    if (!form.licenseNumber.trim()) e.licenseNumber = "Required";
    if (form.experience === "" || Number(form.experience) < 0) e.experience = "Enter valid years";
    if (!form.accountNumber || !ACC_REGEX.test(form.accountNumber)) e.accountNumber = "9-18 digit account number";
    if (!form.ifscCode || !IFSC_REGEX.test(form.ifscCode.toUpperCase())) e.ifscCode = "Invalid IFSC (e.g. HDFC0001234)";
    if (!form.accountHolder.trim()) e.accountHolder = "Required";
    if (!licensePhoto) e.licensePhoto = "Upload your license";
    if (!form.agree) e.agree = "You must agree to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    setServerError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k !== "agree") fd.append(k, v);
      });
      if (licensePhoto) fd.append("licensePhoto", licensePhoto);
      if (rcPhoto) fd.append("rcPhoto", rcPhoto);

      const { data } = await api.post("/drivers/register", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setOtpUserId(data.userId);
      setOtpEmail(data.email);
    } catch (err) {
      setServerError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          padding: "clamp(18px,2vw,28px)",
          width: "clamp(420px,36vw,560px)",
          maxHeight: "78vh",
          overflowY: "auto",
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: "clamp(60px,5vw,80px)", height: "clamp(60px,5vw,80px)",
            fontSize: "clamp(24px,2vw,34px)", margin: "0 auto", borderRadius: "30%",
            background: "#14B8A6", display: "flex", alignItems: "center",
            justifyContent: "center", color: "#fff",
          }}
        >
          <FaCarSide />
        </div>

        <h1 style={{ textAlign: "center", marginTop: "10px", marginBottom: "2px", color: "#0F172A", fontSize: "clamp(18px,1.7vw,28px)" }}>
          Join as a Driver 👋
        </h1>
        <p style={{ textAlign: "center", color: "#64748B", marginBottom: "0px", fontSize: "10px" }}>
          Register and start earning with Hopin
        </p>

        {serverError && (
          <div style={{ marginTop: "12px", padding: "10px 14px", borderRadius: "10px", background: "#FEF2F2", color: "#B91C1C", fontSize: "12px" }}>
            {serverError}
          </div>
        )}

        <h3 style={{ marginBottom: "5px", marginTop: "12px", fontSize: "15px" }}>Personal Information</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <FormInput name="name" placeholder="Full Name" value={form.name} onChange={handleChange} error={errors.name} />
          <FormInput name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} error={errors.phone} />
        </div>
        <div style={{ marginTop: "8px" }}>
          <FormInput name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} error={errors.email} />
        </div>

        <h3 style={{ marginTop: "12px", marginBottom: "5px", fontSize: "clamp(14px,1.2vw,17px)" }}>Vehicle Information</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <FormInput name="vehicleModel" placeholder="Vehicle Model" value={form.vehicleModel} onChange={handleChange} error={errors.vehicleModel} />
          <FormInput name="vehicleNumber" placeholder="Vehicle Number" value={form.vehicleNumber} onChange={handleChange} error={errors.vehicleNumber} />
          <FormInput name="vehicleType" placeholder="Vehicle Type" value={form.vehicleType} onChange={handleChange} error={errors.vehicleType} />
          <FormInput name="color" placeholder="Color" value={form.color} onChange={handleChange} />
        </div>

        <h3 style={{ marginTop: "12px", marginBottom: "5px", fontSize: "15px" }}>Driving Documents</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <FormInput name="licenseNumber" placeholder="Driving License Number" value={form.licenseNumber} onChange={handleChange} error={errors.licenseNumber} />
          <FormInput name="experience" type="number" placeholder="Years of Experience" value={form.experience} onChange={handleChange} error={errors.experience} />
          <FormInput name="rcNumber" placeholder="RC Number" value={form.rcNumber} onChange={handleChange} />
          <FormInput label="Upload License" type="file" onChange={(e) => setLicensePhoto(e.target.files[0])} error={errors.licensePhoto} />
        </div>
        <div style={{ marginTop: "8px" }}>
          <FormInput label="Upload RC (optional)" type="file" onChange={(e) => setRcPhoto(e.target.files[0])} />
        </div>

        <h3 style={{ marginTop: "12px", marginBottom: "5px", fontSize: "15px" }}>Bank Details</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <FormInput name="accountHolder" placeholder="Account Holder Name" value={form.accountHolder} onChange={handleChange} error={errors.accountHolder} />
          <FormInput name="accountNumber" placeholder="Account Number" value={form.accountNumber} onChange={handleChange} error={errors.accountNumber} />
          <FormInput name="ifscCode" placeholder="IFSC Code" value={form.ifscCode} onChange={(e) => handleChange({ target: { name: "ifscCode", value: e.target.value.toUpperCase() } })} error={errors.ifscCode} />
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "15px", alignItems: "center", fontSize: "10px" }}>
          <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
          <span style={{ color: "#475569" }}>I agree to the Terms &amp; Conditions and Privacy Policy</span>
        </div>
        {errors.agree && <span style={{ color: "#EF4444", fontSize: "11px" }}>{errors.agree}</span>}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            width: "100%", height: "clamp(40px,5vh,52px)", fontSize: "clamp(14px,1.2vw,17px)",
            marginTop: "16px", border: "none", borderRadius: "16px",
            background: submitting ? "#94A3B8" : "#14B8A6", color: "#fff",
            fontWeight: "600", cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Submitting..." : "Register as Driver →"}
        </button>
      </div>

      {otpUserId && (
        <OtpModal
          userId={otpUserId}
          email={otpEmail}
          onClose={() => setOtpUserId(null)}
        />
      )}
    </>
  );
}