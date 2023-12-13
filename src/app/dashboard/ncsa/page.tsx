"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Dashboard/navbar";
import Sidebar from "@/components/Dashboard/sidebar";
import NcsaTable from "@/components/tables/ncsaTable";
import Link from "next/link";
import AxiosAPI from "@/utils/axiosApi";
import { Select, Space } from 'antd';
import SearchBar from "@/components/shared/searchBar";

const NCSADashboard = () => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [docs, setDocs] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  console.log({ session });

  const cards = [
    {
      label: "Companies Under Review",
      value: 15,
      link: "#",
    },
    {
      label: "Certified Companies",
      value: 15,
      link: "#",
    },

    {
      label: "Rejected Companies",
      value: 15,
      link: "#",
    },

    {
      label: "All Companies",
      value: 15,
      link: "#",
    },
  ];
  const axiosAPI = new AxiosAPI();
  useEffect(() => {
    const fetchData = async () => {

      setIsLoading(true);
      try {
        const response = await axiosAPI.get<any>(`/getData/clientsdocs`);
        const filteredArray = response.data.filter((obj: any) => obj.reviewerApprove === true);
        setDocs(filteredArray);
        setFilteredData(filteredArray);
        
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  console.log('Fetched data', docs);

  const handleChange = (value: string) => {
    if( value === 'all') {
      setFilteredData(docs);
    }else{
    const filteredArray = docs.filter((obj: any) => obj.documentStuts === value);
    setFilteredData(filteredArray);
    }
  };

  const handleSearch = (value: any) => {
    setFilteredData(
      docs.filter((item: any) => {
        const userName = item.user?.userName?.toLowerCase();
        const companyName = item.user?.companyName?.toLowerCase();

        return userName?.includes(value) || companyName?.includes(value);
      })
      );
      console.log('Searched data', docs);
  };
  return (
    <main className="sm:flex sm:flex-row overflow-hidden w-full bg-fixed bg-center h-screen bg-cover bg-[url('../assets/images/signup_bg.png')]">
      <div>
        <Sidebar />
        <Navbar />
      </div>
      <div className="sm:ml-64 w-full px-6 pt-[5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 whitespace-nowrap gap-4 mt-2">
          {cards.map((card) => (
            <Link
              className="w-full rounded-md bg-white shadow-sm p-4 flex flex-col gap-2"
              key={Math.random()}
              href={card.link}
            >
              <span className="text-slate-400 text-sm font-bold leading-[18px]">
                {card.label}
              </span>
              <span className="text-gray-700 text-lg font-bold leading-relaxed">
                {card.value}
              </span>
            </Link>
          ))}
        </div>

        <div className="p-4 mt-14 bg-white rounded-lg sm:rounded-lg w-full">
          <div className="flex flex-row justify-between">
            <div>
              <h3 className="font-bold  text-lg text-black pt-1">
                List of Companies
              </h3>
              <div className="text-xl mb-2">
                <span className="text-violet-500 text-semibold">+</span>
                <span className="text-gray-400 text-sm">5 Received Companies</span>
              </div>
            </div>
            <div>
              <SearchBar onChange={(e: any) => handleSearch(e.target.value)} />
            </div>
            <div className="mt-2">
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: 'all', label: 'all' },
                  { value: 'received', label: 'Received' },
                  { value: 'certified', label: 'Certified' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'rejected', label: 'Rejected' },
                ]}
              />
            </div>
          </div>

          <NcsaTable data={filteredData} status="pending"/>
        </div>
      </div>
    </main>
  );
};
export default NCSADashboard;
