import { useState, useEffect } from "react";
import { User, Phone, Mail, Calendar, Building2, MapPin, Pencil, Info, Check, X } from "lucide-react";
import api from "../utils/api";

export default function PersonalInfoCard() {
  const [editing, setEditing]   = useState(false);
  const [saving,  setSaving]    = useState(false);
  const [error,   setError]     = useState("");
  const [success, setSuccess]   = useState("");

  const getUser = () => {
    try {
      const s = localStorage.getItem("user");
      return s ? JSON.parse(s) : {};
    } catch { return {}; }
  };

  const buildForm = (u) => ({
    phone:       u.phone       || "",
    email:       u.email       || "",
    gender:      u.gender      || "",
    dob:         u.dob         || "",
    institution: u.college || u.company || "",
    address:     u.address     || "",
  });

  const [form, setForm] = useState(() => buildForm(getUser()));

  // Re-sync when component mounts (catches Google login data)
  useEffect(() => { setForm(buildForm(getUser())); }, []);

  const handleChange = (field, value) => { setError(""); setForm(prev => ({ ...prev, [field]: value })); };

  const validate = () => {
    if (form.phone && !/^\+?[\d\s\-]{10,15}$/.test(form.phone))
      return "Please enter a valid phone number (10-15 digits)";
    if (!form.gender) return "Please select a gender";
    return null;
  };

  const handleSave = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setSaving(true); setError("");
    try {
      const { data } = await api.put("/users/profile", {
        phone: form.phone, gender: form.gender,
        college: form.institution, address: form.address,
      });
      localStorage.setItem("user", JSON.stringify({ ...getUser(), ...data.user }));
      setSuccess("Profile saved!"); setEditing(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      // Fallback: save locally
      localStorage.setItem("user", JSON.stringify({
        ...getUser(), phone: form.phone, gender: form.gender,
        college: form.institution, address: form.address,
      }));
      setSuccess("Saved!"); setEditing(false);
      setTimeout(() => setSuccess(""), 3000);
    } finally { setSaving(false); }
  };

  const rows = [
    { icon: Phone,    label: "Phone",                 key: "phone",       type: "tel",    placeholder: "+91 98765 43210",      editable: true  },
    { icon: Mail,     label: "Email",                 key: "email",       type: "email",  placeholder: "your@email.com",       editable: false },
    { icon: User,     label: "Gender",                key: "gender",      type: "select", options: ["Male","Female","Other","Prefer not to say"], editable: true },
    { icon: Calendar, label: "Date of Birth",         key: "dob",         type: "date",   placeholder: "",                     editable: true  },
    { icon: Building2,label: "Institution / Company", key: "institution", type: "text",   placeholder: "e.g. Sharda University",editable: true  },
    { icon: MapPin,   label: "Home Address",          key: "address",     type: "text",   placeholder: "Enter your address",   editable: true  },
  ];

  return (
    <div style={{ background: "#fff", borderRadius: "18px", padding: "12px 16px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#e8faf8", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User size={14} color="#14b8c4" />
          </div>
          <h3 style={{ margin: 0, fontSize: "14px", fontWeight: "700", color: "#08244b" }}>Personal Information</h3>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {editing && (
            <button onClick={() => { setEditing(false); setError(""); setForm(buildForm(getUser())); }}
              style={{ border: "1px solid #FECACA", background: "#FEF2F2", padding: "5px 10px", borderRadius: "10px", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", color: "#E24B4A" }}>
              <X size={12} /> Cancel
            </button>
          )}
          <button onClick={() => editing ? handleSave() : setEditing(true)} disabled={saving}
            style={{ border: "1px solid #e5e7eb", background: editing ? "#14B8A6" : "#fff", color: editing ? "#fff" : "#08244b", padding: "5px 10px", borderRadius: "10px", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
            {editing ? <Check size={12} /> : <Pencil size={12} />}
            {saving ? "Saving..." : editing ? "Save" : "Edit"}
          </button>
        </div>
      </div>

      {error   && <div style={{ fontSize: 12, color: "#E24B4A", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "8px 12px", marginBottom: 8 }}>⚠️ {error}</div>}
      {success && <div style={{ fontSize: 12, color: "#15803d", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "8px 12px", marginBottom: 8 }}>✅ {success}</div>}

      {/* Rows */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {rows.map((row, index) => {
          const Icon = row.icon;
          const isEmpty = !form[row.key];
          return (
            <div key={index} style={{ display: "grid", gridTemplateColumns: "30px 150px 1fr auto", alignItems: "center", gap: "10px", padding: "8px 0", borderTop: index !== 0 ? "1px solid #f1f5f9" : "none" }}>
              <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={13} color="#1e3a8a" />
              </div>
              <div style={{ fontSize: "13px", color: "#1e3a8a", fontWeight: "500" }}>
                {row.label}
                {!row.editable && <span style={{ fontSize: 10, color: "#94A3B8", marginLeft: 4 }}>(from account)</span>}
              </div>
              {editing && row.editable ? (
                row.type === "select" ? (
                  <select value={form[row.key]} onChange={e => handleChange(row.key, e.target.value)}
                    style={{ width: "100%", border: "1px solid #E5E7EB", outline: "none", borderRadius: "8px", padding: "5px 8px", fontSize: "13px", color: "#08244b", background: "#f8fafc", cursor: "pointer" }}>
                    <option value="">Select gender</option>
                    {row.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={row.type} value={form[row.key]} onChange={e => handleChange(row.key, e.target.value)} placeholder={row.placeholder}
                    style={{ width: "100%", border: "1px solid #E5E7EB", outline: "none", borderRadius: "8px", padding: "5px 8px", fontSize: "13px", color: "#08244b", background: "#f8fafc", boxSizing: "border-box" }} />
                )
              ) : (
                <div style={{ fontSize: "13px", color: isEmpty ? "#94A3B8" : "#08244b", fontStyle: isEmpty ? "italic" : "normal" }}>
                  {form[row.key] || `Add ${row.label.toLowerCase()}`}
                </div>
              )}
              {row.key === "institution" && <Info size={14} color="#14b8c4" />}
            </div>
          );
        })}
      </div>

      {!editing && Object.entries(form).some(([k, v]) => k !== "email" && !v) && (
        <div style={{ marginTop: "10px", padding: "8px 12px", background: "#F0FDFA", borderRadius: "10px", fontSize: "12px", color: "#0f766e", border: "1px solid #99F6E4" }}>
          💡 Click <b>Edit</b> to complete your profile
        </div>
      )}
    </div>
  );
}