"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import UserDropdown from "../shared/UserDropdown";

function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full bg-fixed bg-center bg-cover bg-[url('../assets/images/signup_bg.png')]">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-purple-500 rounded-lg sm:hidden hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-8"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link href="/dashboard/user" className="flex ml-2 md:mr-24">
              <Image
                src={logo}
                width={50}
                height={100}
                alt="The logo image"
                className=" mr-3"
              />
            </Link>
            <div className={hasScrolled ? "hidden" : ""}>
              <p className="hidden md:flex text-lg text-white font-bold pl-6">
                Welcome to Cyboks DPS
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ml-3">
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
