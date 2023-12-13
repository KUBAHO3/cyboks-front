"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getUrlByPathname } from "@/utils";
import SidebarDropdown from "../shared/SidebarDropdown";
import SidebarChartIcon from "../icons/SidebarChartIcon";

type Prop_ = {
  name?: string
}

const Sidebar = ({name}: Prop_) => {
  // get the path name 
  const url = usePathname();

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <ul className="space-y-2 font-medium px-2">
        <li>
          <Link
            href="/dashboard/dpo"
            className={url === getUrlByPathname(url)?"flex items-center p-2 text-white rounded-lg bg-violet-500 group font-bold":"flex items-center p-2 text-white rounded-lg hover:bg-violet-500 group hover:font-bold"}
          >
            <div className=" bg-white px-2 py-1 rounded-lg group-hover:bg-violet-500 ">
              <svg
                className="flex-shrink-0 w-5 h-5 text-violet-500 transition duration-75 group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
            </div>
            <span className="ml-3 text-white ">Dashboard</span>
          </Link>
        </li>

        {/* {(url === "/dashboard/cyboks" || url === "/dashboard/ncsa") && (
          <SidebarDropdown />
        )} */}

        {url === "/dashboard/dpo" && (
          <>
            <li>
              <Link
                href={`/dashboard/dpo/documents/stage1`}
                className={url.includes('documents')?"flex items-center p-2 text-white rounded-lg bg-violet-500 group font-bold":"flex items-center p-2 text-white rounded-lg hover:bg-violet-500 group hover:font-bold"}
              >
                <SidebarChartIcon />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Compliance Steps
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/dpo/staging"
                className="flex items-center p-2 text-white rounded-lg hover:bg-violet-500 group hover:font-bold"
              >
                <SidebarChartIcon />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Document Status
                </span>
              </Link>
            </li>
          </>
        )}
        {name?<li>
          <Link
            href=""
            className="flex items-center p-2 text-white rounded-lg bg-violet-500 group font-bold"
          >
            <SidebarChartIcon />
            <span className="flex-1 ml-3 whitespace-nowrap">{name}</span>
          </Link>
        </li>:''}
        <li>
          <Link
            href={`${getUrlByPathname(url)}/feedback`}
            className="flex items-center p-2 text-white rounded-lg hover:bg-violet-500 group hover:font-bold"
          >
            <SidebarChartIcon />
            <span className="flex-1 ml-3 whitespace-nowrap">Feedback</span>
            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
              3
            </span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
