import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineBell, HiOutlineSearch, HiOutlineChatAlt2 } from "react-icons/hi";
//header 

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // export 

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch (_) {}
  }, []);

  const userName = user?.name || "Guest";
  const avatar = localStorage.getItem("profileImage") || user?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=14B8A6&color=fff&size=128`;

  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-white sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <div className="cursor-pointer" onClick={() => navigate('/home')}>
          <h2 className="m-0 text-slate-900 text-xl font-bold">Hop<span className="text-teal-400">in</span></h2>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-full border border-slate-100">
          <HiOutlineSearch size={18} className="text-slate-400" />
          <input placeholder="Search messages, users or rides..." className="bg-transparent outline-none border-none w-96 text-sm" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-md hover:bg-slate-50"><HiOutlineChatAlt2 size={18} /></button>
        <button className="p-2 rounded-md hover:bg-slate-50"><HiOutlineBell size={18} /></button>
        <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover cursor-pointer" onClick={() => navigate('/profile')} />
      </div>
    </header>
  );
}
// end on to it>>>>>>
