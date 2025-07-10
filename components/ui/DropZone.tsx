"use client";
import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { Button } from './button';
import { toast } from 'sonner';
import { pinata } from '@/lib/pinata';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Dropzone() {
  const [files, setFiles] = useState<Array<{file:File; uploading: boolean}>>([]);
  // upload the files old code
  // const uploadFile = async (file:File)=>{
  //   try {
  //     // we upload everything here'
  //     // temp api Key
  //     const keyRequest = await fetch('/api/key');
  //     const keyData = await keyRequest.json;
  //     const upload  = await pinata.upload.file(file).key(keyData.JWT);
      
  //     toast.success(`File ${file.name} uploaded successfully`)

  //   }
  //   catch(error){
  //     console.log(error);
  //     toast.error("Something went wrong")
  //   }
  // } 

  const uploadFile = async (file: File) => {

  try {
     //set uploading to true
    setFiles((prevFiles) => prevFiles.map((f) =>(
      f.file === file ?{...f,uploading:true}: f)));

    const keyRequest = await fetch('/api/key');
    const keyData = await keyRequest.json();
    const formData = new FormData();
    formData.append('file', file);

    const upload = await fetch('/api/files', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${keyData.JWT}`,
      },
      body: formData,
    });
    //set uploading to false
       setFiles((prevFiles) => prevFiles.map((f) =>(
      f.file === file ?{...f,uploading:false}: f)));

    if (!upload.ok) throw new Error('Upload failed');
    toast.success(`File ${file.name} uploaded successfully`);


  } catch (error) {
      setFiles((prevFiles) => prevFiles.map((f) =>(
      f.file === file ? {...f,uploading:false}: f)));
    console.log(error);
    toast.error("Something went wrong");
  }
};



  const onDrop = useCallback((acceptedFiles: File[]) => {
    
    // Do something with the files
    if(acceptedFiles){
      setFiles((prevFiles)=>[...prevFiles,
        ...acceptedFiles
        .map((file)=>({file, uploading:false}))
      ])

      acceptedFiles.forEach(uploadFile)
    }

  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <>
    <div {...getRootProps({
      className:'p-16 mt-10 border-dashed rounded-lg border-2 w-full'
    })}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <div className='flex flex-col items-center gap-y-3'>
            <p>Drag 'n' drop some files here, or click to select files</p>
              <Button>Select Files</Button>
          </div>
        
      }

    </div>
          <div className='mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 
      md:grid-cols-4 lg:grid-cols-4'>
        {files.map(({file, uploading}) =>(
          <div key={file.name} className='realtive w-full group'>
            <div className='relative'>
              <img src={URL.createObjectURL(file)}
               alt={file.name} 
               width={200} 
               height= {200} 
              className={cn(uploading ?'opacity-50':"",'rounded-lg object-cover size-32')}>

              </img>
              {uploading && (
                <div className='absolute inset-0 flex items-center justify-center'>
                  {/* Loader 2 imported from lucid react */}
                  <Loader2 className='size-6 animate-spin text-primary' />
                </div>
              )}
            </div>
            <p className='mt-2 text-sm text-gray-500 truncate'>{file.name}</p>
            </div>
        ))}
      </div>
    </>
  );
}