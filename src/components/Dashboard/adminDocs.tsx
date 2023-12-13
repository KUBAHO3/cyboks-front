'use client'
import React, { useEffect, useState } from "react";
import AxiosAPI from "@/utils/axiosApi";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import '@react-pdf-viewer/core/lib/styles/index.css';

type Props_ = {
    userId: number
}

function ViewAdminDocs({userId}: Props_) {
    const axiosAPI = new AxiosAPI();
    const [user, setUser] = useState<any>(false);
    const [docs, setDocs] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log('the user ID', userId)
    useEffect(() => {
        const fetchData = async () => {
    
          setIsLoading(true);
          try {
            const response = await axiosAPI.get<any>(`/getData/users/${userId}`);
            setUser(response);
            console.log('Fetched data', response);
            
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };
    fetchData();
    }, []);

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
              docname: 'Representative Contract',
              doclink: user?.clientDoc[0].repContract?.replace(/"/g, "")
            },
          ])
        }
        }, [user]);

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

const pdfUrl = 'https://pdfobject.com/pdf/sample.pdf';


return (
    <div className="columns-2 gap-4">
            {docs?.map((doc: any) =>(
              <div className="max-w-sm bg-white border mt-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href={doc.doclink}>
                      <h5 className="my-2 text-2xl  px-6 font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue-300">{doc.docname}</h5>
                  </a>
                  {!doc.doclink?.endsWith(".pdf")?<h1 className="text-2xl text-center font-semibold text-red-600 dark:text-white ">No documents</h1>:
                    <>
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
                        <div style={{ height: '200px', width: '300px' }}>
                          <Viewer fileUrl={(doc.doclink !== null || doc.doclink === '')?doc.doclink:pdfUrl} />
                        </div>
                      </Worker>
                    </>}
              </div>
            ))}

            


              
          </div>
)
}

export default ViewAdminDocs;
