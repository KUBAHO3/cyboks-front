'use client'
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { FileUpload } from './file_upload';
import { toast } from 'react-toastify';
import AxiosAPI from "@/utils/axiosApi";
import { refreshPage } from '@/utils';

type Props_ = {
    docsId: number
}

function PrimaryRevDocModal({docsId}: Props_) {
  const axiosAPI = new AxiosAPI();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filesData, setFilesData] = useState({
    lawSummary: '',
    unfilledMapQuestionaire: "",
    });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true)
    console.log('Submit', filesData);
    try {
      const response = axiosAPI.put(`/update/primaryReviewerDocs/${docsId}`, filesData);
      console.log(response); // Handle the response as needed
      setIsLoading(false)
      toast.success('Docs uploaded succesfully');
      refreshPage(1000)
    } catch (error) {
      console.error(error);
      setIsLoading(false)
      toast.error('Oops sth went wrong');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleFileChange = async (file: File, fieldName: string) => {
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
    console.log('file link', JSON.stringify(json.secure_url))
    setFilesData({
          ...filesData,
          [fieldName]: JSON.stringify(json.secure_url), // Update the specified field name with the result
        });
}

  return (
    <div className="App">
      <a
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        className="font-medium text-sm ml-2 text-green-600 dark:text-red-500 hover:underline cursor-pointer"
        onClick={openModal}
      >
        + Add documments
      </a>

      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-black rounded-lg shadow dark:bg-gray-700">
            <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={closeModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-white dark:text-white">
                  Add a following docs
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className=" p-2 mt-4 rounded-lg sm:rounded-lg m-2">
                    <div className="mt-1">
                        <FileUpload
                        labelClass="text-white text-sm font-normal "
                        labelName="1. Law Summary"
                        inputType="file"
                        inputClass="relative ml-3 block w-full min-w-0 flex-auto rounded border border-solid border-white px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
                        inputName="lawSummary"
                        containerClass="w-full sm:pr-4"
                        disable={false}
                        handleFileChange={(file: any) => handleFileChange(file, "lawSummary")}
                        />
                    </div>
                    <div>
                        <FileUpload
                        labelClass="text-white text-sm font-normal "
                        labelName="2. Un filled data mapping questioinaire"
                        inputType="file"
                        inputClass="relative ml-3 block w-full min-w-0 flex-auto rounded border border-solid border-white px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
                        inputName="unfilledMapQuestionaire"
                        containerClass="w-full sm:pr-4"
                        disable={false}
                        handleFileChange={(file: any) => handleFileChange(file, "unfilledMapQuestionaire")}
                        />
                    </div>
                </div>
                    <div className="mt-8 px-16">
                    <button
                        type="submit"
                        className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 w-full rounded-xl"
                    >
                        Submit
                    </button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrimaryRevDocModal;