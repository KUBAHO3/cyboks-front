import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import MultiSelect, { Option } from '../forms/multiSelector/MultiSelector'
import AxiosAPI from "@/utils/axiosApi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Spinner from "../shared/Spinner";
import { refreshPage } from "@/utils";

type Prop_ = {
  userId?: number
  docsId?: number
  options?: any[]
}

function CommentForm({userId, docsId, options}: Prop_) {
  const [optionSelected, setSelected] = useState<Option[] | null>();
  const [isLoad, setIsLoad] = useState(false)
  const [data, setData] = useState<any>({
    selectedFiles: [],
    message: ''
  })

  const router = useRouter();

  const axiosAPI = new AxiosAPI();

  const handleChange = (selected: Option[]) => {
    setSelected(selected);
    setData({...data, selectedFiles: selected?.map(option => option.value)})
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault(); 
    console.log('selected options', data);
    setIsLoad(true);
    try {
      const response = await axiosAPI.post<any>(
        `/comment/${userId}/comment/${docsId}`,
        data
      );
      console.log('Responses data: ',response.data); // Handle the response as needed
       // Handle the response as needed
      setIsLoad(false);
      toast.success('Message sent succesfully');
      refreshPage()

    } catch (error) {
      console.error(error);
      setIsLoad(false);
      toast.error('something went wrong');
    }
    // Prevent the default form submission behavior
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
    <div className="p-4">
      <MultiSelect
          key="example_id"
          options={options}
          onChange={handleChange}
          value={optionSelected}
          isSelectAll={true}
          menuPlacement={"bottom"}
        />
        <div className="my-4">    
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Comment</label>
          <textarea id="message" rows={4} onChange={(e:any) => setData({...data, message: e.target.value})} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Write your message here..."></textarea>
        </div>
        <button type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800">
            {isLoad?<Spinner />:"Push Comment"}
        </button>
    </div>
    </form>
    </>
  );
}

export default CommentForm;
