import React from "react";

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50">
      <div className="w-96 bg-white rounded-lg p-5 shadow-[0_12px_40px_rgba(2,6,23,0.2)]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 m-0">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 text-xl">✕</button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
