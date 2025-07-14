import React from "react";

export function DocumentFilter() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-400">
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 13.5 10 19 14 21 14 13.5 22 3"></polygon></svg>
      </span>
      <select className="rounded-lg border border-gray-200 bg-white py-2.5 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100">
        <option>All types</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
} 