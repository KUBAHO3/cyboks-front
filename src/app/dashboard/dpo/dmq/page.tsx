/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import Navbar from '@/components/Dashboard/navbar';
import Sidebar from '@/components/Dashboard/sidebar';
import Link from 'next/link';
import { server } from '@/utils/axios';
import { FileUpload } from '@/components/Dashboard/file_upload';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';


const page = () => {

  //local state
  const [unfilledDmq, setUnfiledDmq] = useState('');
  const [fileData, setFileData] = useState({
    filledMapQuestionnaire:''
    });
  const [isLoading, setIsLoading] = useState(false)


//get the dmq file
  const getDmq  = async (id: number) => {
    try {
      const res = await server.get(`/getData/clientsdoc/${id}`);
      return res.data.unfilledMapQuestionaire;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  useEffect(() => {
    (async () => {
      const data = await getDmq(15);
      if (data) {
        setUnfiledDmq(data);
      }
    })();
  }, []);

 
  //handle change to upload file to server(cloudnary)
  const handleFileChange = async (file: any, fieldName: string) => {
    var formData = new FormData();
    formData.append("file", file);
    formData.append(`${process.env.NEXT_PUBLIC_CLOUD_NAME}`, `${process.env.NEXT_PUBLIC_CLOUD_NAME}`)
    formData.append("upload_preset", `${process.env.NEXT_PUBLIC_CLOUD_PRESET}`)

    let res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/upload`,
        {
            method: "post",
            mode: "cors",
            body: formData
        }
    );

    let json = await res.json();
    setFileData({
          ...fileData,
          [fieldName]: JSON.stringify(json.secure_url),
        });
}

// submit the filledDatamapping
const handleSubmit =async  (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  try {
    setIsLoading(true)
   await server.put(`/update/secondaryClientDocs/${15}`, fileData);
   setIsLoading(false)
    toast.success('Docs uploaded succesfully');
    setFileData({filledMapQuestionnaire:''});

    // Set a timeout to reload the page after 3.5 seconds
    setTimeout(() => {
      window.location.reload();
    }, 3500);

  } catch (error) {
    console.error(error);
    toast.error('Oops sth went wrong');
    setIsLoading(false)
  }
};


    return (
      <main className="sm:flex sm:flex-row w-full h-screen bg-fixed bg-center bg-cover bg-[url('../assets/images/back.png')]">
      <div>
        <Sidebar />
        <Navbar />
      </div>
      <div className='text-white flex justify-start items-center p-4 sm:ml-64 sm:mt-14 w-full'>
        <div className='border rounded-md w-[70%] h-[70%] flex flex-col items-center gap-8 p-8'>
          <h1 className="text-4xl">Data mapping Questionnaire</h1>
          <p className='text-center text-lg'>Here is the Data mapping questionnaire unfilled document sent by Cyboks, click to get it unfilled <span className='text-[#e9700f] hover:underline'><Link href={unfilledDmq}>DATA MAPPING QUESTIONNAIRE</Link></span> and upload it filled</p>
          
          <form onSubmit={handleSubmit} className='flex flex-col gap-16'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="filledMapQuestionnaire">Upload data mapping filled file</label>
              <FileUpload
                labelClass="text-white text-sm font-normal"
                labelName=""
                inputType="file"
                inputClass="relative ml-3 block w-full min-w-0 flex-auto rounded border border-solid border-white px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                inputName="filledMapQuestionnaire"
                containerClass="w-full sm:pr-4"
                disable={false}
                handleFileChange={(file: any) => handleFileChange(file, "filledMapQuestionnaire")}
              />
            </div>
            <button 
              type="submit" 
              className='bg-[#e9700f] text-white py-2 px-4 rounded-md text-sm flex justify-center items-center gap-2'
              >
              {isLoading && <Spinner />} Upload
            </button>
          </form>
        </div>
      </div>
    </main>
    
      );
}

export default page