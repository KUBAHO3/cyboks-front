'use client'
import Link from 'next/link';
import React, { useState } from 'react';

const DButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center p-2 rounded-lg hover:bg-white group hover:font-bold">
        <div className=" bg-white px-2 py-1 rounded-lg group-hover:bg-green-700 ">
           <svg className="flex-shrink-0 w-5 h-5 text-green-700 transition duration-75 group-hover:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
             <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
           </svg>
         </div>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className=" ml-2 whitespace-nowrap"
        type="button"
      >
        Exporter List
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="z-10 block absolute bg-white divide-y divide-green-100 rounded-lg dark:bg-gr-700"
        >
          <ul
            className="py-2 text-sm text-grreen-700 dark:text-green-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <Link
                href="/dashboard_Cyboks/received"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Received
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard_Cyboks/under_review"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Under Review
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard_Cyboks/cancelled"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Cancelled
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard_Cyboks/sent"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                sent
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard_Cyboks/certified"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Certified
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DButton;