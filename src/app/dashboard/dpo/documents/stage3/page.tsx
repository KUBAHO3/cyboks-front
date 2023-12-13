'use client'
import Navbar from "@/components/Dashboard/navbar";
import Sidebar from "@/components/Dashboard/sidebar";
import AdDocModal from "@/components/Dashboard/docummentModal";
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
    const [isLoading, setIsLoading] = useState(false);
    const userId = 7
    const axiosAPI = new AxiosAPI();

    console.log('the user ID', userId)
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
            <PrimaryClientDocModal docsId={3}/>
          </div>
          <div className=" p-2 rounded-lg sm:rounded-lg m-2">
            <AdDocComments options={options}  docsId={3} userId={7}/>
          </div>
        </div>
        <div className="flex flex-row gap-8 mb-4">
          <div>
            <ViewDocs userId={7} viewdocs={docs}/>
            {videoId?<YouTube videoId={videoId[videoId?.length - 1]} className="mt-8 rounded-lg"/>:""}
          </div>
          <ViewCommentChat options={options} userId={7} documentId={3}/>
        </div>
      </div>
    </main>
  );
}
export default dpoStage3;
