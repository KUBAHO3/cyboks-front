"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Dashboard/navbar";
import Sidebar from "@/components/Dashboard/sidebar";
import Link from "next/link";
import AxiosAPI from "@/utils/axiosApi";
import InputError from "@/components/forms/InputError";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupSchema } from "@/schemas/auth";
import { toast } from "react-toastify";
import Spinner from '@/components/shared/Spinner';

const ProfileUpdate = () => {
  const session = useSession();
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<any>({
    mode: "onSubmit",
    defaultValues: {
        userName: '',
          companyPhoneNumber: '',
          companyName: '',
          accessLevel: '',
    }
  });

  const axiosAPI = new AxiosAPI();
  useEffect(() => {
    const fetchData = async () => {

      setIsLoading(true);
      try {
        const response = await axiosAPI.get<any>(`/getData/users/9`);
        setUser(response);
        console.log('Fetched data', response);
        
    } catch (error) {
        console.error(error);
    }
    setIsLoading(false);
};
fetchData();
}, []);
console.log('Fetched data', user);
useEffect(() => {
  if (user !== null) {
    const {
      userName,
      companyPhoneNumber,
      companyName,
      accessLevel,
    } = user;
    reset({
      userName,
      companyPhoneNumber,
      companyName,
      accessLevel,
    });
  }
}, [user, reset]);


  const onSubmit = handleSubmit(async (data) => {
    try {

        // Custom payload
        const payload = {
          userName: data.username,
          companyPhoneNumber: data.companyPhoneNumber,
          companyName: data.companyName,
          accessLevel: data.accessLevel,
          
        };
        setIsLoading(true);
  
        const res = await axiosAPI.put(`/update/user/${7}`, payload);
  
      } catch (err: any) {
        try {

            // Custom payload
            const payload = {
              userName: data.userName,
              userEmail: data.userEmail,
              companyName: data.companyName,
              accessLevel: data.accessLevel,
            };
            setIsLoading(true);
      
            const res = await axiosAPI.post("/auth/signup", payload);
      
      
          } catch (err: any) {
            toast.error(err.response.data.message || "Something went wrong.");
          } finally {
            setIsLoading(false);
          }toast.error(err.response.data.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
  })

  return (
    <main className="sm:flex sm:flex-row overflow-hidden w-full bg-fixed bg-center h-screen bg-cover bg-[url('../assets/images/signup_bg.png')]">
    <div>
      <Sidebar />
      <Navbar />
    </div>
    <div className="sm:ml-64 w-full px-6 pt-[5rem] ">
      <div className="px-16">
        <form onSubmit={onSubmit}>
            <div className='flex gap-4 w-full'>
            <div className='w-1/3'>
                <label
                htmlFor="username"
                className="text-white text-l font-normal"
                >
                Your User Name
                </label>
                <input
                type="text"
                id="username"
                className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                placeholder="Cyboks Representative Email"
                {...register("userName")}
                />

                <InputError />
            </div>
            <div className='w-1/3'>
                <label
                htmlFor="username"
                className="text-white text-l font-normal"
                >
                Your Company Name
                </label>
                <input
                type="text"
                id="username"
                className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                placeholder="Enter your company name"
                {...register("companyName")}
                />

                <InputError />
            </div>
            </div>  
            <div className='flex items-center gap-4'>

            <div className='w-1/3'>
                <label
                htmlFor="text"
                className="text-white text-l font-normal"
                >
                Company phone number
                </label>
                <input
                type="text"
                id="phone"
                className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                placeholder="Enter your company number"
                {...register("companyPhoneNumber")}
                />

                <InputError />
            </div>

            <div className='w-1/3'>
                
                <label htmlFor="roles" className="text-white text-l font-normal">Enter access level</label>
                <select id="accessLevel" className="text-white rounded-md bg-black bg-opacity-0 border border-white text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 mt-[2px]"
                onChange={(e) => {
                    setValue("accessLevel",e.target.value);
                  }}
                  defaultValue={user?.accessLevel}
                >
                    <option value="low" className=' bg-black bg-opacity-0 text-black'>low</option>
                    <option value="medium" className=' bg-black bg-opacity-0 text-black'>medium</option>
                    <option value="high" className=' bg-black bg-opacity-0 text-black'>high</option>
                </select>
                <InputError />
            </div>
            </div>
            <div className="py-4">
                <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 w-1/4 rounded"
                >
                {isLoading ? <Spinner /> : "Save"}
                </button>
            </div>
        </form>
      </div>
    </div>
    </main>
  )

}

export default ProfileUpdate;
