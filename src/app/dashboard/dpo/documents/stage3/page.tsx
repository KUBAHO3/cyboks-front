'use client'
import Navbar from "@/components/Dashboard/navbar";
import Sidebar from "@/components/Dashboard/sidebar";
import { useSession } from "next-auth/react";
import AdDocComments from "@/components/Dashboard/commentModel";
import ViewAdminDocs from "@/components/Dashboard/adminDocs";
import ViewCommentChat from "@/components/Dashboard/commentChat";
import StageNav from "@/components/Dashboard/StageNav";
import PrimaryClientDocModal from "@/components/Dashboard/primaryClientDocs";
import ViewDocs from "@/components/Dashboard/viewPCDocs";
import { useEffect, useState } from "react";
import AxiosAPI from "@/utils/axiosApi";
import YouTube from 'react-youtube';

function dpoStage3() {
    const [user, setUser] = useState<any>(false);
    const [videoId, setVideoId] = useState<any>(false);
    const [docs, setDocs] = useState<any>([]);
    const [userId, setUserId] = useState<any>(false);
    const [docsId, setDoocsId] = useState<any>(false);
      const [isLoading, setIsLoading] = useState(false);
      const session = useSession();

      const axiosAPI = new AxiosAPI();

// use effects
useEffect(() => {
  if (session.data?.user.id, session.data?.user.docsId) {
    setUserId(session.data?.user.id);
    setDoocsId(session.data?.user.docsId);
  }
}, [session.data?.user.id, session.data?.user.docsId]);

  // use effects
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if(userId){
      try {
        const response = await axiosAPI.get<any>(`/getData/users/${userId}`);
        setUser(response);
        console.log("Fetched data", response);
      } catch (error) {
        console.error(error);
      }}
      setIsLoading(false);
    };
    fetchData();
  }, [userId]);

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
          docname: "Data protection policy",
          doclink: user?.clientDoc[0].dataProtectPolicies?.replace(/"/g, ""),
        },
      ]);
      setVideoId(
        user?.clientDoc[0].empTraining?.split('=')
      )
    }
  }, [user]);


    console.log('videoId: ' + videoId)

  const options = [
    { value: "gapAnalysis", label: "Gap analysis" },
    { value: "riskAssessment", label: "Risk assessment" },
    { value: "riskMitigation", label: "Risk mitigation" },
    { value: "incidenceRes", label: "Incidence Response" },
    { value: "filledMapQuestionnaire", label: "Filled questionaire" },
    { value: "dataProtectPolicies", label: "Data protection policy" },
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
            Compliance steps
          </h3>

        </div>
        <div className="flex flex-row justify-between">
          <div className=" p-2 rounded-lg sm:rounded-lg m-2">
            <PrimaryClientDocModal docsId={docsId}/>
          </div>
          <div className=" p-2 rounded-lg sm:rounded-lg m-2">
            <AdDocComments options={options}  docsId={docsId} userId={userId} room="reviewer-dpo"/>
          </div>
        </div>
        <div className="flex flex-row gap-8 mb-4">
          <div>
            <ViewDocs userId={userId} viewdocs={docs}/>
            {videoId?<YouTube videoId={videoId[videoId?.length - 1]} className="mt-8 rounded-lg"/>:""}
          </div>
          <ViewCommentChat options={options} userId={userId} documentId={docsId} room="reviewer-dpo"/>
        </div>
      </div>
    </main>
  );
}
export default dpoStage3;
