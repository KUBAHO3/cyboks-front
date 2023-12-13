"use client";
import { useState } from "react";
import { FileUpload } from "@/components/Dashboard/file_upload";
import Sidebar from "@/components/Dashboard/sidebar";
import Navbar from "@/components/Dashboard/navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

function CyboksDashboard() {
  const router = useRouter();

  const handleSave = () => {
    console.log("Save button clicked");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Form submitted");

    router.push("/dashboard_Cyboks/compliance");
  };

  return (
    <main className="overflow-y-auto sm:flex sm:flex-row w-full h-screen bg-fixed bg-center bg-cover bg-[url('../assets/images/back.png')]">
      <div>
        <Sidebar />
        <Navbar />
      </div>
      <div className=" p-4 sm:ml-64 sm:mt-10">
        <div className=" p-2 mt-14 rounded-lg sm:rounded-lg m-2">
          <h3 className="font-bold  text-xl text-white pl-2 pt-1">
            Compliance Steps
          </h3>
          <div>
            <div className=" p-2 mt-4 rounded-lg sm:rounded-lg m-2">
              <div className="text-white text-sm hover:text-violet-500">
                <Link href={""}>1. Summary About The Law</Link>
              </div>
              <div className="mt-1">
                <FileUpload
                  labelClass="text-white text-sm font-normal "
                  labelName="2. General data mapping questionnaire"
                  inputType="file"
                  inputClass="relative ml-3 block w-full min-w-0 flex-auto rounded border border-solid border-white px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
                  inputName="Document"
                  containerClass="w-full sm:pr-4"
                  disable={false}
                  handleFileChange={undefined}
                />
              </div>
              <div>
                <FileUpload
                  labelClass="text-white text-sm font-normal "
                  labelName="3. Gap Analysis"
                  inputType="file"
                  inputClass="relative ml-3 block w-full min-w-0 flex-auto rounded border border-solid border-white px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
                  inputName="Document"
                  containerClass="w-full sm:pr-4"
                  disable={false}
                  handleFileChange={undefined}
                />
              </div>
              <div>
                <FileUpload
                  labelClass="text-white text-sm font-normal "
                  labelName="4. Risk Assessments"
                  inputType="file"
                  inputClass="relative ml-3 block w-full min-w-0 flex-auto rounded border border-solid border-white px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
                  inputName="Document"
                  containerClass="w-full sm:pr-4"
                  disable={false}
                  handleFileChange={undefined}
                />
              </div>
              <div>
                <FileUpload
                  labelClass="text-white text-sm font-normal "
                  labelName="5. Risk Mitigation"
                  inputType="file"
                  inputClass="relative ml-3 block w-full min-w-0 flex-auto rounded border border-solid border-white px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
                  inputName="Document"
                  containerClass="w-full sm:pr-4"
                  disable={false}
                  handleFileChange={undefined}
                />
              </div>
              <div>
                <FileUpload
                  labelClass="text-white text-sm font-normal "
                  labelName="6. Incidence Response Plan"
                  inputType="file"
                  inputClass="relative ml-3 block w-full min-w-0 flex-auto rounded border border-solid border-white px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
                  inputName="Document"
                  containerClass="w-full sm:pr-4"
                  disable={false}
                  handleFileChange={undefined}
                />
              </div>
              <div className="text-white text-sm mt-1 hover:text-violet-500">
                <Link href={""}>7. Employee Training</Link>
              </div>
            </div>
            <div className="flex justify-between mt-8 px-16">
              <button
                onClick={handleSave}
                className="bg-black bg-opacity-0 border border-solid border-white hover:bg-violet-600 text-white font-semibold py-2 w-full rounded-xl"
              >
                Save
              </button>
              <button
                type="submit"
                className="ml-6 bg-black bg-opacity-0 border border-solid border-white hover:bg-violet-600 text-white font-semibold py-2 w-full rounded-xl"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className=" p-2 mt-4 rounded-lg sm:rounded-lg m-2">
          <h3 className="font-bold  text-xl text-white pl-2 pt-1">
            Required Data Protection Policies
          </h3>
          <div className="p-4 mt-1">
            <FileUpload
              labelClass="text-white text-sm font-normal "
              labelName="Required Data Protection Policies"
              inputType="file"
              inputClass="relative ml-3 block w-full min-w-0 flex-auto rounded border border-solid border-white px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
              inputName="Document"
              containerClass="w-full sm:pr-4"
              disable={false}
              handleFileChange={undefined}
            />
          </div>
          <div className="flex justify-between mt-8 pb-8 px-16">
            <button
              onClick={handleSave}
              className="bg-black bg-opacity-0 border border-solid border-white hover:bg-violet-600 text-white font-semibold py-2 w-full rounded-xl"
            >
              Save
            </button>
            <button
              type="submit"
              className="ml-6 bg-black bg-opacity-0 border border-solid border-white hover:bg-violet-600 text-white font-semibold py-2 w-full rounded-xl"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
export default CyboksDashboard;
