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

function dpoStage2() {
    const [user, setUser] = useState<any>(false);
    const [docs, setDocs] = useState<any>([]);
    const [userId, setUserId] = useState<any>(false);
    const [docsId, setDoocsId] = useState<any>(false);
      const [isLoading, setIsLoading] = useState(false);
    const axiosAPI = new AxiosAPI();
    const session = useSession();

    // console.log('the user ID', userId)

        // use effects
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
            const response = await axiosAPI.get<any>(`/getData/users/${20}`);
            setUser(response);
            // console.log('Fetched data', response);
            
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
            docname: 'Law Summary',
            doclink: user?.clientDoc[0].lawSummary?.replace(/"/g, "")
            },
            {
            docname: 'UnFilled DM Questionaire',
            doclink: user?.clientDoc[0].unfilledMapQuestionaire?.replace(/"/g, "")
            },
            {
            docname: 'Filled DM Questionaire',
            doclink: user?.clientDoc[0].filledMapQuestionnaire?.replace(/"/g, "")
            },
            
        ])
        }
    }, [user]);

  const options = [
    { value: "unfilledMapQuestionaire", label: "un Filled data mapping questionaire" },
    { value: "lawSummary", label: "Law summary" },
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
            Data Mapping Questionaire
          </h3>

        </div>
        <div className="flex flex-row justify-between">
          <div className=" p-2 rounded-lg sm:rounded-lg m-2">
          {userId?<PrimaryClientDocModal docsId={docsId}/>:""}
          </div>
          <div className=" p-2 rounded-lg sm:rounded-lg m-2">
            {userId?<AdDocComments options={options}  docsId={docsId} userId={userId}/>:""}
          </div>
        </div>
        <div className="flex flex-row gap-8 mb-4">
          {userId?<ViewDocs userId={userId} viewdocs={docs}/>:""}
          {userId?<ViewCommentChat options={options} userId={userId} documentId={docsId}/>:""}
        </div>
      </div>
    </main>
  );
}
export default dpoStage2;
