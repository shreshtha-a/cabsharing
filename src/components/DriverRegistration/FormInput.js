export default function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  error,
  required,
}) {
  if (type === "file") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
        {label && <label style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A" }}>{label}</label>}
        <input
          type="file"
          name={name}
          accept="image/*,.pdf"
          onChange={onChange}
          style={{
            width: "100%",
            border: `1px solid ${error ? "#EF4444" : "#CBD5E1"}`,
            borderRadius: "14px",
            padding: "6px 10px",
            fontSize: "10px",
            boxSizing: "border-box",
            background: "#FFFFFF",
          }}
        />
        {error && <span style={{ color: "#EF4444", fontSize: "11px" }}>{error}</span>}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
      {label && <label style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A" }}>{label}</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: "100%",
          height: "36px",
          border: `1px solid ${error ? "#EF4444" : "#CBD5E1"}`,
          borderRadius: "14px",
          padding: "0 16px",
          fontSize: "12px",
          outline: "none",
          boxSizing: "border-box",
          background: "#FFFFFF",
        }}
      />
      {error && <span style={{ color: "#EF4444", fontSize: "11px" }}>{error}</span>}
    </div>
  );
}