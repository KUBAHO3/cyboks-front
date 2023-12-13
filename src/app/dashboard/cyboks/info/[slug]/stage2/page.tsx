'use client'
import Navbar from "@/components/Dashboard/navbar";
import Sidebar from "@/components/Dashboard/sidebar";
import AdDocComments from "@/components/Dashboard/commentModel";
import ViewCommentChat from "@/components/Dashboard/commentChat";
import StageNav from "@/components/Dashboard/StageNav";
import ViewDocs from "@/components/Dashboard/viewPCDocs";
import { useEffect, useState } from "react";
import AxiosAPI from "@/utils/axiosApi";
import { usePathname } from "next/navigation";
import SecondaryRevDocModal from "@/components/Dashboard/secondaryRevDocs";

export default function dpoStage2() {
    const [documment, setDocumment] = useState<any>(false);
    const [docs, setDocs] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    const router = usePathname();
  
    var parts = router.split('/');
    var lastString = parts[parts.length - 2];
    const paths = { params: { slug: lastString } };

    const axiosAPI = new AxiosAPI();

    console.log('the user ID', Number(paths?.params.slug))
    useEffect(() => {
        const fetchData = async () => {
    
          setIsLoading(true);
          try {
            const response = await axiosAPI.get<any>(`/getData/clientsdoc/${Number(paths?.params.slug)}`);
            setDocumment(response);
            console.log('Fetched data', response);
            
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };
    fetchData();
    }, []);

    useEffect(() => {
        if(documment){
        setDocs([
            {
            docname: 'Law Summary',
            doclink: documment?.lawSummary?.replace(/"/g, "")
            },
            {
            docname: 'UnFilled DM Questionaire',
            doclink: documment?.unfilledMapQuestionaire?.replace(/"/g, "")
            },
            {
            docname: 'Filled DM Questionaire',
            doclink: documment?.filledMapQuestionnaire?.replace(/"/g, "")
            },
            
        ])
        }
    }, [documment]);


  const options = [
    { value: "unfilledMapQuestionaire", label: "un Filled data mapping questionaire" },
    { value: "lawSummary", label: "Law summary" },
    ];

  return (
    <main className="overflow-y-auto sm:flex sm:flex-row w-full h-screen bg-fixed bg-center bg-cover bg-[url('../assets/images/back.png')]">
      <div>
        <Sidebar  name={documment?.user?.companyName}/>
        <Navbar />
      </div>
      <div className=" p-4 sm:ml-64 sm:mt-10 mb-8">
        

      <StageNav  docsId={Number(paths?.params.slug)}/>

      <div className="gap-4 justify-center mt-4 flex flex-row">
            <div className="bg-white flex p-3 rounded">
              <p className="text-gray-600 text-lg">
                Company Name: 
              </p>
              <h3 className="font-bold text-lg text-black pl-2">
                {documment?.user?.companyName}
              </h3>
            </div>
            <div className="bg-white flex p-3 rounded">
              <p className="text-gray-600 text-lg">
                DPO Name: 
              </p>
              <h3 className="font-bold text-lg text-black pl-2">
                {documment?.user?.userName}
              </h3>
            </div>
            <div className="bg-white flex p-3 rounded">
              <p className="text-gray-600 text-lg">
                DPO Phone: 
              </p>
              <h3 className="font-bold text-lg text-black pl-2">
                {documment?.user?.companyPhoneNumber}
              </h3>
            </div>
            <div className="bg-white flex p-3 rounded">
              <p className="text-gray-600 text-lg">
                DPO Email: 
              </p>
              <h3 className="font-bold text-lg text-black pl-2">
                {documment?.user?.userEmail}
              </h3>
            </div>
          </div>

        <div className=" p-2 mt-4 rounded-lg sm:rounded-lg m-2">
          <h3 className="font-bold  text-xl text-white pl-2 pt-1">
            Data Mapping Questionaire
          </h3>

        </div>
        <div className="flex flex-row justify-between">
          <div className=" p-2 rounded-lg sm:rounded-lg m-2">
            {documment?<SecondaryRevDocModal docsId={documment?.id}/>:''}
          </div>
          <div className=" p-2 rounded-lg sm:rounded-lg m-2">
          {documment?<AdDocComments options={options}  docsId={documment?.id} userId={documment.user.id}/>:''}
          </div>
        </div>
        <div className="flex flex-row gap-8 mb-4">
          {documment?<ViewDocs userId={documment.user.id} viewdocs={docs}/>:''}
          {documment?<ViewCommentChat options={options} userId={documment.user.id} documentId={documment?.id}/>:''}
        </div>
      </div>
    </main>
  );
}

