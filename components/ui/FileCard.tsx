import React from 'react';
import { MoreVertical } from 'lucide-react';

interface FileCardProps {
  fileName: string;
  uploadDate: string;
  fileSize: string;
}

export const FileCard: React.FC<FileCardProps> = ({ fileName, uploadDate, fileSize }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 w-[180px] flex flex-col items-center relative border border-gray-200">
      {/* 3-dot menu */}
      <div className="absolute top-3 right-3 cursor-pointer group">
        <MoreVertical className="w-5 h-5 text-gray-400" />
        {/* Dropdown menu (hidden by default) */}
        <div className="hidden group-hover:block absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Download</button>
          <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Share</button>
          <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</button>
        </div>
      </div>
      {/* File icon */}
      <div className="bg-blue-50 rounded-full p-4 mb-3 mt-2">
        {/* Replace with your file icon SVG or component */}
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#EEF2FF"/><path d="M8 7a2 2 0 0 1 2-2h2.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 17 9.828V17a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7Z" stroke="#2563EB" strokeWidth="1.5"/><path d="M14 5.5V9a2 2 0 0 0 2 2h3" stroke="#2563EB" strokeWidth="1.5"/></svg>
      </div>
      {/* File name */}
      <div className="text-sm font-medium text-gray-800 truncate w-full text-center" title={fileName}>{fileName}</div>
      {/* Upload date and size */}
      <div className="text-xs text-gray-500 mt-1 text-center">{uploadDate} - {fileSize}</div>
    </div>
  );
}; 