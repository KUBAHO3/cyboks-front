'use client'
import React, { useEffect, useState } from "react";
import AxiosAPI from "@/utils/axiosApi";

type Props_ = {
    userId: number
    documentId: number
    options: any[]
}

function ViewCommentChat({userId, documentId, options}: Props_) {
    const axiosAPI = new AxiosAPI();
    const [comments, setComments] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
    
          setIsLoading(true);
          try {
            const res = await axiosAPI.get<any>(`/getData/comments/${documentId}`);
            const filteredArray = res.filter((obj: any) => {
                return obj.selectedFiles.some((file: any) => {
                  return options.some((doc: any) => doc.value === file);
                });
              });
            setComments(filteredArray.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
            console.log('Fetched comments', res);
            
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };
    fetchData();
    }, []);

    return (
        <div className="border rounded-lg pb-4">
              {comments?.map((comment: any) =>(

            <div className={(comment.user.id !== userId)?"relative max-w-sm bg-white border mt-4 border-gray-200 rounded-r-lg shadow dark:bg-gray-800 dark:border-gray-700 mr-16 ml-2":"relative max-w-sm bg-violet-100 border mt-4 border-gray-200 rounded-l-lg shadow dark:bg-gray-800 dark:border-gray-700 ml-16 mr-2"}>
              <div className="text-center">
                {comment.selectedFiles?.map((file: string, index: number) =>(<>
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{file}</span>
                    {(index%3)===1?<br/>:''}
                </>
                
                ))}
              </div>
              <p className={(comment.user.id !== userId)?"absolute top-0 bg-slate-300 rounded-md left-0 text-xs text-black":"absolute top-0 bg-violet-300 rounded-md right-0 text-xs text-black"}>{comment.user.userName}</p>
              <div className={(comment.user.id !== userId)?"bg-slate-100 rounded-md text-sm mt-1 mx-1 mb-4 font-semibold px-2":"bg-violet-50 rounded-md text-sm mt-1 mx-1 mb-4 font-semibold px-2"}>{comment.message}</div>
              <p className={(comment.user.id !== userId)?"absolute bottom-0 bg-slate-100 rounded-md left-0 text-xs text-black":"absolute bottom-0 bg-violet-50 rounded-md right-0 text-xs text-black"}>{new Date(comment.createdAt).toLocaleDateString()}|{new Date(comment.createdAt).toLocaleTimeString()}</p>
            </div>
              ))}

          </div>
    )
}
export default ViewCommentChat