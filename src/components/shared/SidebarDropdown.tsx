import { openSans } from "@/utils/fonts";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import SidebarChartIcon from "../icons/SidebarChartIcon";
import { usePathname } from "next/navigation";
import { getUrlByPathname } from "@/utils";

const SidebarDropdown = () => {
  // get the path name
  const url = usePathname();

  const items: MenuProps["items"] = [
    {
      label: (
        <Link
          href={`${getUrlByPathname(url)}/pending`}
          className={`text-[1rem] font-bold flex items-center gap-2 ${openSans.className}`}
        >
          Pending
        </Link>
      ),
      key: "item-1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link
          href={`${getUrlByPathname(url)}/certified`}
          className={`text-[1rem] font-bold flex items-center gap-2 ${openSans.className}`}
        >
          Certified
        </Link>
      ),
      key: "item-2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link
          href={`${getUrlByPathname(url)}/rejected`}
          className={`text-[1rem] font-bold flex items-center gap-2 ${openSans.className}`}
        >
          Rejected
        </Link>
      ),
      key: "item-3",
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <li className="cursor-pointer">
        <div className="flex items-center p-2 text-white rounded-lg hover:bg-violet-500 group hover:font-bold">
          <SidebarChartIcon />
          <span className="flex-1 ml-3 whitespace-nowrap flex items-center gap-2">
            Companies <DownOutlined className="text-[12px] mt-1" />
          </span>
        </div>
      </li>
    </Dropdown>
  );
};

export default SidebarDropdown;
