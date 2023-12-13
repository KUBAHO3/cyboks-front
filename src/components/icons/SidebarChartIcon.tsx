const SidebarChartIcon = () => {
  return (
    <div className=" bg-white px-2 py-1 rounded-lg group-hover:bg-violet-500 ">
      <svg
        className="flex-shrink-0 w-5 h-5 text-violet-500 transition duration-75 group-hover:text-white hidden"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      ></svg>
      <svg
        className="flex-shrink-0 w-5 h-5 text-violet-500 transition duration-75 group-hover:text-white "
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        {" "}
        <path stroke="none" d="M0 0h24v24H0z" />{" "}
        <rect x="3" y="12" width="6" height="8" rx="1" />{" "}
        <rect x="9" y="8" width="6" height="12" rx="1" />{" "}
        <rect x="15" y="4" width="6" height="16" rx="1" />{" "}
        <line x1="4" y1="20" x2="18" y2="20" />
      </svg>
    </div>
  );
};

export default SidebarChartIcon;
