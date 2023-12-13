'use client';
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Dashboard/sidebar";
import Navbar from "@/components/Dashboard/navbar";
import { usePathname } from "next/navigation";
import AxiosAPI from "@/utils/axiosApi";
import AdDocComments from "@/components/Dashboard/commentModel";
import ViewAdminDocs from "@/components/Dashboard/adminDocs";
import ViewCommentChat from "@/components/Dashboard/commentChat";
import PrimaryRevDocModal from "@/components/Dashboard/primaryReviewerDocs";
import StageNav from "@/components/Dashboard/StageNav";

interface pageProps {
  params: { info: string, slug: string};
}
export default function Info() {
  const [user, setUser] = useState<any>(false);
  const [isLoading, setIsLoading] = useState(false);
  const axiosAPI = new AxiosAPI();
    const router = usePathname();
  
    var parts = router.split('/');
    var lastString = parts[parts.length - 2];
    const paths = { params: { slug: lastString } };
  

  useEffect(() => {
    const fetchData = async () => {

      setIsLoading(true);
      try {
        const response = await axiosAPI.get<any>(`/getData/clientsdoc/${Number(paths?.params.slug)}`);
        setUser(response);
        console.log('Fetched data', response);
        
    } catch (error) {
        console.error(error);
    }
    setIsLoading(false);
};
fetchData();
}, []);
  console.log('Fetching data', user)

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
        <Sidebar name={user?.user?.companyName}/>
        <Navbar />
      </div>
      <div className="p-4 sm:ml-64">
        <div className="pt-12 p-2 rounded-lg sm:rounded-lg m-2">
        <StageNav docsId={Number(paths?.params.slug)}/>
          <div className="gap-4 justify-center mt-4 flex flex-row">
            <div className="bg-white flex p-3 rounded">
              <p className="text-gray-600 text-lg">
                Company Name: 
              </p>
              <h3 className="font-bold text-lg text-black pl-2">
                {user?.user?.companyName}
              </h3>
            </div>
            <div className="bg-white flex p-3 rounded">
              <p className="text-gray-600 text-lg">
                DPO Name: 
              </p>
              <h3 className="font-bold text-lg text-black pl-2">
                {user?.user?.userName}
              </h3>
            </div>
            <div className="bg-white flex p-3 rounded">
              <p className="text-gray-600 text-lg">
                DPO Phone: 
              </p>
              <h3 className="font-bold text-lg text-black pl-2">
                {user?.user?.companyPhoneNumber}
              </h3>
            </div>
            <div className="bg-white flex p-3 rounded">
              <p className="text-gray-600 text-lg">
                DPO Email: 
              </p>
              <h3 className="font-bold text-lg text-black pl-2">
                {user?.user?.userEmail}
              </h3>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className=" p-2 rounded-lg sm:rounded-lg m-2">
            {user?<PrimaryRevDocModal docsId={user?.id} />:""}
            </div>
            <div className=" p-2 rounded-lg sm:rounded-lg m-2">
            {user?<AdDocComments options={options} docsId={user?.id} userId={7}/>:""}
            </div>
          </div>
          <div className="flex flex-row gap-8 mb-4">
            {user?<ViewAdminDocs userId={user?.user?.id}/>:''}
            {user?<ViewCommentChat options={options} userId={user?.user?.id} documentId={user?.id}/>:''}
          </div>
        </div>
      </div>
    </main>
  );
}

