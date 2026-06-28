import React from "react";

export default function Card({ children, style = {}, className = "" }) {
  return (
    <div className={`${className} bg-white rounded-lg p-4 shadow-[0_8px_24px_rgba(15,45,82,0.04)]`} style={style}>
      {children}
    </div>
  );
}
