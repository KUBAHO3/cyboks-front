'use client'
import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import '@react-pdf-viewer/core/lib/styles/index.css';

type Props_ = {
    userId: number
    viewdocs: any[]
}

function ViewDocs({userId, viewdocs}: Props_) {
    
const pdfUrl = 'https://pdfobject.com/pdf/sample.pdf';


return (
    <div className="grid grid-cols-2 gap-4">
            {viewdocs?.map((doc: any) =>(
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

export default ViewDocs;
