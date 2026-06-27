export default function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        width: "100%",
      }}
    >
      <label
        style={{
          fontSize: "14px",
          fontWeight: "800",
          color: "#0F172A",
        }}
      >
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          height: "30px",
          border: "1px solid #CBD5E1",
          borderRadius: "14px",
          padding: "0 16px",
          fontSize: "10px",
          outline: "none",
          boxSizing: "border-box",
          background: "#FFFFFF",
        }}
      />
    </div>
  );
}