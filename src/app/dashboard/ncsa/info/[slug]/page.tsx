'use client'
import Navbar from "@/components/Dashboard/navbar";
import Sidebar from "@/components/Dashboard/sidebar";
import AdDocComments from "@/components/Dashboard/commentModel";
import ViewCommentChat from "@/components/Dashboard/commentChat";
import ViewDocs from "@/components/Dashboard/viewPCDocs";
import { useEffect, useState } from "react";
import AxiosAPI from "@/utils/axiosApi";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { refreshPage } from "@/utils";
import { server } from "@/utils/axios";
import Spinner from "@/components/Spinner";
import NcsaCertifyModal from "@/components/Dashboard/ncsaCertifyDoc";

export default function dpoStage2() {
    const [documment, setDocumment] = useState<any>(false);
    const [docs, setDocs] = useState<any>([]);
    const [videoId, setVideoId] = useState<any>(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = usePathname();
  
    var parts = router.split('/');
    var lastString = parts[parts.length - 1];
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
              docname: 'Letter to CEO',
              doclink: documment?.letterToCeo?.replace(/"/g, "")
            },
            {
              docname: 'Incorporation certificate',
              doclink: documment?.certIncorporation?.replace(/"/g, "")
            },
            {
              docname: 'DPO id card',
              doclink: documment?.dpoID?.replace(/"/g, "")
            },
            {
              docname: 'Application form',
              doclink: documment?.appForm?.replace(/"/g, "")
            },
            {
              docname: "Data protection Policy",
              doclink: documment?.dataProtectPolicies?.replace(/"/g, ""),
            },
            {
              docname: "Certificate",
              doclink: documment?.certificate?.replace(/"/g, ""),
            },
          ]);
          setVideoId(
            documment?.empTraining?.split('=')
          )
        }
    }, [documment]);


  const options = [
    { value: "dataProtectPolicies", label: "Data protection Policy" },
    { value: "letterToCeo", label: "Letter to ceo" },
    { value: "certIncorporation", label: "Incorporation certificate" },
    { value: "dpoID", label: "DPO Id" },
    { value: "appForm", label: "Application form" },
    { value: "certificate", label: "Certificate" },
    ];

    async function HandleApprove () {
      setIsLoading(true);
  
      const res = await server.patch(`/update/toggleNcsaApprove/${Number(paths?.params.slug)}`);
  
      if (res) {
        toast.success("Company sent successfully.");
  
        setIsLoading(false);
  
        return refreshPage();
      }
  
      setIsLoading(false);
  
      return toast.error("An error occured.");
    };
  return (
    <main className="overflow-y-auto sm:flex sm:flex-row w-full h-screen bg-fixed bg-center bg-cover bg-[url('../assets/images/back.png')]">
      <div>
        <Sidebar  name={documment?.user?.companyName}/>
        <Navbar />
      </div>
      <div className=" p-4 sm:ml-64 sm:mt-10 mb-8">
        
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
            Certify a Company
          </h3>

        </div>
        <div className="flex flex-row justify-between">
          <div className=" p-2 rounded-lg sm:rounded-lg m-2">
            {documment?<NcsaCertifyModal docsId={documment?.id}/>:''}
          </div>
          <div className=" p-2 rounded-lg sm:rounded-lg m-2">
            {documment?<button
                        type="button"
                        className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-4 py-2 w-full rounded-xl"
                        onClick={HandleApprove}
                    > {isLoading?<Spinner/>:<>{documment.ncsaApprove?'Un Approve':'Approve'}</>}
                    </button>:''}
          </div>
          <div className=" p-2 rounded-lg sm:rounded-lg m-2">
          {documment?<AdDocComments options={options}  docsId={documment?.id} userId={documment.user.id} room="reviewer-ncsa"/>:''}
          </div>
        </div>
        <div className="flex flex-row gap-8 mb-4">
          {documment?
          <div>
            <ViewDocs userId={documment.user.id} viewdocs={docs}/>
            {/* <YouTube videoId={videoId[videoId.length - 1]} className="mt-8 rounded-lg"/> */}
          </div>
          
          :''}
          {documment?<ViewCommentChat options={options} userId={documment.user.id} documentId={documment?.id} room="reviewer-ncsa"/>:''}
        </div>
      </div>
    </main>
  );
}

