import Navbar from "@/components/Dashboard/navbar";
import Sidebar from "@/components/Dashboard/sidebar";
import Link from "next/link";
import React from "react";

function DpoDashboard() {
  return (
    <main className="sm:flex sm:flex-row w-full h-screen bg-fixed bg-center bg-cover bg-[url('../assets/images/signup_bg.png')]">
      <div>
        <Sidebar />
        <Navbar />
      </div>
      <div className="p-4 sm:ml-64">
        <div className="sm:flex sm:flex-row mt-16">
          <div className="flex flex-row bg-white rounded-lg p-4 mx-6 w-full justify-between mt-2">
            <div className="flex flex-row justify-between">
              <p className="text-slate-400 text-xs font-bold  leading-[18px] mr-4">
                Received <br />
                Companies
              </p>
            </div>
            <div className="">
              <p className="text-gray-700 text-lg font-bold  leading-relaxed">
                15
              </p>
            </div>
          </div>
          <div className="flex flex-row bg-white rounded-lg p-4 mx-6 w-full justify-between mt-2">
            <div className="flex flex-row justify-between">
              <p className="text-slate-400 text-xs font-bold  leading-[18px] mr-4">
                Cancelled <br />
                Companies
              </p>
            </div>
            <div className="">
              <p className="text-gray-700 text-lg font-bold  leading-relaxed">
                15
              </p>
            </div>
          </div>
          <div className="flex flex-row bg-white rounded-lg p-4 mx-6 w-full justify-between mt-2">
            <div className="flex flex-row justify-between">
              <p className="text-slate-400 text-xs font-bold  leading-[18px]">
                Companies Under Review
              </p>
            </div>
            <div className="">
              <p className="text-gray-700 text-lg font-bold  leading-relaxed">
                15
              </p>
            </div>
          </div>
          <div className="flex flex-row bg-white rounded-lg p-4 mx-6 w-full justify-between mt-2">
            <div className="flex flex-row justify-between">
              <p className="text-slate-400 text-xs font-bold  leading-[18px]">
                Companies Under Review
              </p>
            </div>
            <div className="">
              <p className="text-gray-700 text-lg font-bold  leading-relaxed">
                15
              </p>
            </div>
          </div>
        </div>
        <ol className="ml-20 mt-6 relative text-white border-l border-violet-500 dark:border-gray-700 dark:text-gray-400">
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-violet-300 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-violet-500">
              <svg
                className="w-3.5 h-3.5 text-white dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Received by Cyboks</h3>
            <p className="text-xs font-light">
              Your documents were received by Cyboks
            </p>
          </li>
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-violet-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-violet-300">
              <svg
                className="w-3.5 h-3.5 text-violet-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Z" />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Under Review</h3>
            <p className="text-xs font-light">
              Your documents are being reviewed by Cyboks
            </p>
          </li>
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-violet-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-violet-300">
              <svg
                className="w-3.5 h-3.5 text-violet-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2" />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Sent To NCSA</h3>
            <p className="text-xs font-light">
              Your documents were sent to NCSA for review
            </p>
          </li>
          <li className="mb-10 ml-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-violet-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-violet-300">
              <svg
                className="w-3.5 h-3.5 text-violet-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2" />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Under Review</h3>
            <p className="text-xs font-light">
              Your documents are being reviewed by NCSA
            </p>
          </li>
          <li className="ml-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-violet-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-violet-300">
              <svg
                className="w-3.5 h-3.5 text-violet-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Certified</h3>
            <p className="text-xs font-light">
              click{" "}
              <Link
                href=""
                className="text-center hover:text-violet-600 hover:font-extrabold  leading-tight"
              >
                here
              </Link>{" "}
              to download your certificate
            </p>
          </li>
        </ol>
      </div>
    </main>
  );
}
export default DpoDashboard;
