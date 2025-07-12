"use client";
import React, {useCallback, useState} from 'react';
import {FileRejection, useDropzone} from 'react-dropzone';
import { Button } from './button';
import { toast } from 'sonner';
import { pinata } from '@/lib/pinata';
import { Loader2, Trash2Icon} from 'lucide-react';
import { cn } from '@/lib/utils';
import { deleteImage } from '@/lib/actions';

export function Dropzone() {
  const [files, setFiles] = useState<Array<{file:File; uploading: boolean; id?:string}>>([]);


  const uploadFile = async (file: File) => {
  try {
     //set uploading to true
    const keyRequest = await fetch('/api/key');
    const keyData = await keyRequest.json();
    const formData = new FormData();
    formData.append('file', file);

    const uploadResponse = await fetch('/api/files', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${keyData.JWT}`,
      },
      body: formData,
    });
    // Parse the response to get the uploaded file's ID
    const uploadData = await uploadResponse.json();
    console.log(`This is the upload data: ${uploadData}`)

    //set uploading to false
    setFiles((prevFiles) => 
      prevFiles.map((f) =>
        f.file === file ? { ...f, uploading: false, id: uploadData.cid } : f
      )
    );
    toast.success(`File ${file.name} uploaded successfully`);

  } catch (error) {
      setFiles((prevFiles) => prevFiles.map((f) =>(
      f.file === file ? {...f,uploading:false}: f)));
    console.log(error);
    toast.error("Something went wrong");
  }
};


const removeFile = async(fileId:string, fileName:string) =>{
  if(fileId){
    const result = await deleteImage(fileId);
    if(result.success){
      setFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileId ))
    }
    toast.warning (`File ${fileName} deleted!`)
  }
  else {
    toast.error('Error deleting file...')
  }
}

  const onDrop = useCallback((acceptedFiles: File[]) => {
    
    // Do something with the files
    if(acceptedFiles){
      setFiles((prevFiles)=>[...prevFiles,
        ...acceptedFiles
        .map((file)=>({file, uploading:true}))
      ])

      acceptedFiles.forEach(uploadFile)
    }

  }, []);

 const rejectedFiles = useCallback((fileRejection:FileRejection[])=> {
if(fileRejection.length){
  const tooManyFiles = fileRejection.find((rejection)=> 
    rejection.errors[0].code === "too-many-files" );
  if(tooManyFiles){
    toast.error('Too many files selected, max is 5.');
  }
  const fileSize = fileRejection.find((rejection)=>
    rejection.errors[0].code === "file-too-large");
  if(fileSize){
    toast.error('File exceeds 5mb limit!')
  }


}
 },[])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    onDropRejected:rejectedFiles,
    maxFiles:5,
    maxSize: 1024 * 1024 * 5, //5mb
    accept: {
      "image/*":[],
    }
  })

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
    <div className='mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4'>
      {files.map(({file, uploading, id}) =>(
        <div key={file.name} className='realtive w-full group'>
          <div className='relative'>
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              width={200}
              height={200}
              className={cn(uploading && 'opacity-50', 'rounded-lg object-cover size-32')}
            />
            {uploading && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <Loader2 className='size-6 animate-spin text-primary' />
              </div>
            )}
            <form action={()=>removeFile(id!, file.name)} className='absolute top-2 right-2 opacity-0 group-hover:opacity-100
                      transition-opacity'>
            <Button size="icon" variant="destructive">
              <Trash2Icon/>
            </Button>
          </form>
          </div>

          <p className='mt-2 text-sm text-gray-500 truncate'>{file.name}</p>
        </div>
      ))}
    </div>
  </>
  );
}