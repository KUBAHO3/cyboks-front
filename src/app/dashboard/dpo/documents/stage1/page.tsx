'use client'
import React, { useEffect, useState } from "react";
import AxiosAPI from "@/utils/axiosApi";
import Navbar from "@/components/Dashboard/navbar";
import Sidebar from "@/components/Dashboard/sidebar";
import AdDocModal from "@/components/Dashboard/docummentModal";
import AdDocComments from "@/components/Dashboard/commentModel";
import ViewCommentChat from "@/components/Dashboard/commentChat";
import StageNav from "@/components/Dashboard/StageNav";
import ViewDocs from "@/components/Dashboard/viewPCDocs";
import { useSession } from "next-auth/react";

export default function dpoStage1() {
  const axiosAPI = new AxiosAPI();
  const [user, setUser] = useState<any>(false);
  const [docs, setDocs] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<any>(false);
  const [docsId, setDoocsId] = useState<any>(false);
  const session = useSession();

  useEffect(() => {
    if (session.data?.user.id, session.data?.user.docsId) {
      setUserId(session.data?.user.id);
      setDoocsId(session.data?.user.docsId);
    }
  }, [session.data?.user.id, session.data?.user.docsId]);
  useEffect(() => {
      const fetchData = async () => {
  
        setIsLoading(true);
        if(userId){
        try {
          const response = await axiosAPI.get<any>(`/getData/users/${userId}`);
          setUser(response);
          console.log('Fetched data', response);
          
      } catch (error) {
          console.error(error);
      }}
      setIsLoading(false);
  };
  fetchData();
  }, [userId]);

  useEffect(() => {
      if(user){
        setDocs([
          {
            docname: 'Letter to CEO',
            doclink: user?.clientDoc[0].letterToCeo?.replace(/"/g, "")
          },
          {
            docname: 'Incorporation certificate',
            doclink: user?.clientDoc[0].certIncorporation?.replace(/"/g, "")
          },
          {
            docname: 'DPO id card',
            doclink: user?.clientDoc[0].dpoID?.replace(/"/g, "")
          },
          {
            docname: 'Application form',
            doclink: user?.clientDoc[0].appForm?.replace(/"/g, "")
          },
          {
            docname: 'Registration Licence',
            doclink: user?.clientDoc[0].regLicence?.replace(/"/g, "")
          },
          {
            docname: 'Legal institution',
            doclink: user?.clientDoc[0].legalInst?.replace(/"/g, "")
          },
          {
            docname: 'Represanter Contract',
            doclink: user?.clientDoc[0].repContract?.replace(/"/g, "")
          },
        ])
      }
      }, [user]);

  const options = [
    { value: "letterToCeo", label: "Letter to CEO" },
    { value: 'certIncorporation', label: "Inc. certificate" },
    { value: 'dpoID', label: "DPO ID card" },
    { value: 'appForm', label: "Application form" },
    { value: 'regLicence', label: "Registration Licence" },
    { value: "legalInst", label: "Legal institution" },
    { value: 'repContract', label: "Rep. contract" },
    ];


  return (
    <main className="overflow-y-auto sm:flex sm:flex-row w-full h-screen bg-fixed bg-center bg-cover bg-[url('../assets/images/back.png')]">
      <div>
        <Sidebar />
        <Navbar />
      </div>
      <div className=" p-4 sm:ml-64 sm:mt-10 mb-8">
        

      <StageNav />

        <div className=" p-2 mt-4 rounded-lg sm:rounded-lg m-2">
          <h3 className="font-bold  text-xl text-white pl-2 pt-1">
            Dpo adminstrative documents
          </h3>

        </div>
        <div className="flex flex-row justify-between">
          <div className=" p-2 rounded-lg sm:rounded-lg m-2">
            {docsId?<AdDocModal docsId={docsId}/>:''}
          </div>
          <div className=" p-2 rounded-lg sm:rounded-lg m-2">
            {userId?<AdDocComments options={options}  docsId={docsId} userId={userId} room="reviewer-dpo"/>:""}
          </div>
        </div>
        <div className="flex flex-row gap-8 mb-4">
        {userId?<ViewDocs userId={userId} viewdocs={docs}/>:""}
          {userId?<ViewCommentChat options={options} userId={userId} documentId={docsId} room="reviewer-dpo"/>:""}
        </div>
      </div>
    </main>
  );
}

