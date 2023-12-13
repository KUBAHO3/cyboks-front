"use client";
import { FileUpload } from "@/components/Dashboard/file_upload";
import Navbar from "@/components/Dashboard/navbar";
import Sidebar from "@/components/Dashboard/sidebar";
import Link from "next/link";

function DpoDashboard() {
  return (
    <main className="sm:flex sm:flex-row w-full h-screen bg-fixed bg-center bg-cover bg-[url('../assets/images/back.png')]">
      <div>
        <Sidebar />
        <Navbar />
      </div>
      <div className="p-4 sm:ml-64 sm:mt-14">
        <div className=" p-2 mt-14 rounded-lg sm:rounded-lg m-2">
          <h3 className="font-bold  text-xl text-white pl-2 pt-1">
            Compliance Steps
          </h3>
          <div className=" p-2 mt-4 rounded-lg sm:rounded-lg m-2 text-white text-lg ">
            <div className="mt-2">
              <Link href={""}>1. Summary About The Law</Link>
              <div className="mt-2">
                <Link href={""}>2. General Data Mapping Questionnaire</Link>
              </div>
              <div className="mt-2">
                <Link href={""}>3. Gap Analysis</Link>
              </div>
              <div className="mt-2">
                <Link href={""}>4. Risk Assessment</Link>
              </div>
              <div className="mt-2">
                <Link href={""}>5. Risk Mitigation</Link>
              </div>
              <div className="mt-2">
                <Link href={""}>6. Incidence Response Plan</Link>
              </div>
              <div className="mt-2">
                <Link href={""}>7. Employee Training</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default DpoDashboard;
