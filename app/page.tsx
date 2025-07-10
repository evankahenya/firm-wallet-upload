"use client";
import { Dropzone } from "@/components/ui/DropZone";

export default function Home(){
  return(<div className="max-w-xl mx-auto min-h-screen w-screen flex flex-col
  items-center justify-center">
    <h1 className="text-5xl">Upload <span className="text-primary">Files</span></h1>
    <Dropzone />
    </div>)
}