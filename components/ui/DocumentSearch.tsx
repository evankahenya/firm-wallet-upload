import React from "react";

export function DocumentSearch() {
  return (
    <div className="flex-1 max-w-xl">
      <div className="relative">
        <input
          type="text"
          placeholder="Search files by name..."
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#636366' }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </span>
      </div>
    </div>
  );
} 