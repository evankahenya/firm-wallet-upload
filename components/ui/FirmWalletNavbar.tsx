import React from "react";

export function Navbar({ active = "Overview" }: { active?: string }) {
  const tabs = ["Overview", "My Uploads", "My Downloads", "My Bin"];
  return (
    <nav className="py-6">
      <ul className="flex gap-12 border-b border-transparent">
        {tabs.map((tab) => (
          <li key={tab} className="">
            <button
              className={`text-[15px] font-light pb-2 border-b-2 transition-colors duration-200 font-[Outfit,sans-serif]` +
                (active === tab
                  ? " text-blue-700 border-blue-700"
                  : " text-gray-700 border-transparent hover:text-blue-700")
              }
              style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 300 }}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
} 