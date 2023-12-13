import Sidebar from "@/components/Dashboard/sidebar";
import Navbar from "@/components/Dashboard/navbar";
import React from "react";

function CyboksDashboard() {
    return(
        <main className="sm:flex sm:flex-row w-full h-screen bg-fixed bg-center bg-cover bg-[url('../assets/images/back.png')]">
          <div>
          <Sidebar/>
          <Navbar/>
          </div>
        <div className="p-4 text-white text-xl mt-20 sm:ml-64 pl-20">
          <h1 className="mt-10 ml-20">No feedbacks available</h1> 
       </div>
       </main>
    );
}
export default CyboksDashboard