import React from "react";
import Sidebar from "@/components/Dashboard/sidebar";
import Navbar from "@/components/Dashboard/navbar";

function Certified() {
  return (
    <main className="sm:flex sm:flex-row w-full bg-fixed bg-center bg-cover bg-[url('../assets/images/signup_bg.png')]">
      <div>
        <Sidebar />
        <Navbar />
      </div>
      <div className="p-8 sm:ml-64 mr-0">
        <div className=" sm:ml-16 p-2 mt-14 bg-white rounded-lg sm:rounded-lg">
          <h3 className="font-bold  text-lg text-black pl-2 pt-1">
            Certified Companies
          </h3>
          <table className="relative overflow-y-auto w-full text-sm mt-4  text-left text-gray-500">
            <thead className="text-xs text-violet-500 bg-gray-50 ">
              <tr className="">
                <th scope="col" className="px-1 py-2">
                  Company Name
                </th>
                <th scope="col" className="px-1 py-2">
                  DPO's Name
                </th>
                <th scope="col" className="px-1 py-2">
                  DPO's Email Address
                </th>
                <th scope="col" className="px-1 py-2">
                  DPO's Phone Number
                </th>
                <th scope="col" className="px-1 py-2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  CHUK
                </th>
                <td className="px-1 py-2">Antoinette Uwineza</td>
                <td className="px-1 py-2">a.uwineza@chuk.rw</td>
                <td className="px-1 py-2">(+250) 780345627</td>
                <td className="px-1 py-2">Certified</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Norrsken
                </th>
                <td className="px-1 py-2">Rene Patrick Komeza</td>
                <td className="px-1 py-2">r.komeza@norrsken.com</td>
                <td className="px-1 py-2">(+250) 780345627</td>
                <td className="px-1 py-2">Certified</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Skol Ltd
                </th>
                <td className="px-1 py-2">Kayiranga Ernest</td>
                <td className="px-1 py-2">e.kayiranga@skolbrewery.com</td>
                <td className="px-1 py-2">(+250) 790349627</td>
                <td className="px-1 py-2">Certified</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  CHUK
                </th>
                <td className="px-1 py-2">Antoinette Uwineza</td>
                <td className="px-1 py-2">a.uwineza@chuk.rw</td>
                <td className="px-1 py-2">(+250) 780345627</td>
                <td className="px-1 py-2">Certified</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Norrsken
                </th>
                <td className="px-1 py-2">Rene Patrick Komeza</td>
                <td className="px-1 py-2">r.komeza@norrsken.com</td>
                <td className="px-1 py-2">(+250) 780345627</td>
                <td className="px-1 py-2">Certified</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Skol Ltd
                </th>
                <td className="px-1 py-2">Kayiranga Ernest</td>
                <td className="px-1 py-2">e.kayiranga@skolbrewery.com</td>
                <td className="px-1 py-2">(+250) 790349627</td>
                <td className="px-1 py-2">Certified</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  CHUK
                </th>
                <td className="px-1 py-2">Antoinette Uwineza</td>
                <td className="px-1 py-2">a.uwineza@chuk.rw</td>
                <td className="px-1 py-2">(+250) 780345627</td>
                <td className="px-1 py-2">Certified</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Norrsken
                </th>
                <td className="px-1 py-2">Rene Patrick Komeza</td>
                <td className="px-1 py-2">r.komeza@norrsken.com</td>
                <td className="px-1 py-2">(+250) 780345627</td>
                <td className="px-1 py-2">Certified</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-1 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Skol Ltd
                </th>
                <td className="px-1 py-2">Kayiranga Ernest</td>
                <td className="px-1 py-2">e.kayiranga@skolbrewery.com</td>
                <td className="px-1 py-2">(+250) 790349627</td>
                <td className="px-1 py-2">Certified</td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-center justify-center">
            <nav aria-label="Page navigation example">
              <ul className="flex items-center -space-x-px h-8 text-sm my-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-2.5 h-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    4
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    5
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-2.5 h-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}
export default Certified;
