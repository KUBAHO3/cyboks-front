"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import YouTube from 'react-youtube';
import Navbar from "@/components/Dashboard/navbar";
import Sidebar from "@/components/Dashboard/sidebar";
import AxiosAPI from "@/utils/axiosApi";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { openSans } from "@/utils/fonts";
import ViewDocs from "@/components/Dashboard/viewPCDocs";
import ViewCommentChat from "@/components/Dashboard/commentChat";

const DPODashboard = () => {
  // local states
  const [user, setUser] = useState<any>(false);
  const [videoId, setVideoId] = useState<any>(false);
  const [docs, setDocs] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  // session
  const session = useSession();
  console.log('sessions',{ session });

  // axios api class
  const axiosAPI = new AxiosAPI();

  // UI cards
  const cards = [
    {
      label: "Uploaded Documents",
      value: docs.filter((doc: any) => doc.dockLink !== undefined).length,
      link: "#",
    },
    {
      label: "Missing Documents",
      value: docs.filter((doc: any) => doc.dockLink === undefined).length,
      link: "#",
    },

    {
      label: "Comments",
      value: "N/A",
      link: "#",
    },
  ];

  console.log("@@@@ ===> usr docs: ", docs);

  // use effects
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosAPI.get<any>(`/getData/users/${7}`);
        setUser(response);
        console.log("Fetched data", response);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      setDocs([
        {
          docname: "Gap analysis",
          doclink: user?.clientDoc[0].gapAnalysis?.replace(/"/g, ""),
        },
        {
          docname: "Risk assessment",
          doclink: user?.clientDoc[0].riskAssessment?.replace(/"/g, ""),
        },
        {
          docname: "Risk mitigation",
          doclink: user?.clientDoc[0].riskMitigation?.replace(/"/g, ""),
        },
        {
          docname: "Incident Responce",
          doclink: user?.clientDoc[0].incidenceRes?.replace(/"/g, ""),
        },
        {
          docname: "Map Questionaire",
          doclink: user?.clientDoc[0].filledMapQuestionnaire?.replace(/"/g, ""),
        },
        {
          docname: "Certificate issued",
          doclink: user?.clientDoc[0].certificate?.replace(/"/g, ""),
        },
      ]);
      setVideoId(
        user?.clientDoc[0].empTraining?.split('=')
      )
    }
  }, [user]);

  // sample pdf urls
  const pdfUrl = "https://pdfobject.com/pdf/sample.pdf";
  const options = [
    { value: "warning", label: "other messages" },
    ];
  return (
    <main
      className={`overflow-y-auto sm:flex sm:flex-row w-full h-screen bg-fixed bg-center bg-cover bg-[url('../assets/images/back.png')] ${openSans.className}`}
    >
      <div>
        <Sidebar />
        <Navbar />
      </div>
      <div className="sm:ml-64 w-full px-6 pt-[5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 whitespace-nowrap gap-4 mt-2">
          {cards.map((card) => (
            <Link
              className="w-full rounded-md bg-white shadow-sm p-4 flex flex-col gap-2"
              key={Math.random()}
              href={card.link}
            >
              <span className="text-slate-400 text-sm font-bold leading-[18px]">
                {card.label}
              </span>
              <span className="text-gray-700 text-lg font-bold leading-relaxed">
                {card.value}
              </span>
            </Link>
          ))}
        </div>

        <div className="p-4 mt-14 rounded-lg sm:rounded-lg w-full">
          <h3 className="font-bold text-white text-lg text-black pt-1">
            List of Complience steps Documents
          </h3>
          <div className="my-3">
            <Link
              className="text-[15px] mb-2 hover:underline font-bold"
              href="/dashboard/dpo/documents/stage1"
            >
              <span className="text-violet-500 text-semibold mr-1">
                + Add Documents
              </span>
            </Link>
          </div>
          <div className="flex flex-row gap-8 mb-4">
            
            <div>
              <ViewDocs userId={7} viewdocs={docs}/>
              {videoId?<YouTube videoId={videoId[videoId?.length - 1]} className="mt-8 rounded-lg"/>:""}
            </div>
            <ViewCommentChat options={options} userId={7} documentId={3}/>
          </div>
        </div>
      </div>
    </main>
  );
};
export default DPODashboard;
