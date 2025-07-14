"use client";
import { Dropzone } from "@/components/ui/DropZone";
import { useState } from "react";
import { Navbar } from "@/components/ui/FirmWalletNavbar";
import { DocumentSearch } from "@/components/ui/DocumentSearch";
import { DocumentFilter } from "@/components/ui/DocumentFilter";
import { FileCard } from "@/components/ui/FileCard";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-start">
      <Navbar />
        <Dropzone />
        <div className="w-full flex items-center justify-between mt-8 mb-4 gap-4 bg-[#F4F7FB] px-1 py-2 rounded-xl" >
          <div className="flex-1 min-w-0">
            <DocumentSearch />
          </div>
          <div className="flex-shrink-0 ml-4">
            <DocumentFilter />
          </div>
        </div>
        {/* My Files Section */}
        <div className="w-full mt-6">
          <h2 className="text-lg font-semibold mb-4 ml-1">My Files</h2>
          <div className="flex flex-row gap-4 flex-wrap" id="myFiles">
            {/* Example FileCards - replace with dynamic data later */}
            <FileCard fileName="Completion_Certif..." uploadDate="May 20, 2024" fileSize="800 KB" />
            <FileCard fileName="Financials_Q1_rep..." uploadDate="May 25, 2024" fileSize="1.1 MB" />
            <FileCard fileName="Annual_Report_2024..." uploadDate="May 30, 2024" fileSize="2.5 MB" />
            <FileCard fileName="Annual_Report_2023..." uploadDate="May 30, 2024" fileSize="2.5 MB" />
          </div>
        </div>
      </div>
    </div>
  );
}