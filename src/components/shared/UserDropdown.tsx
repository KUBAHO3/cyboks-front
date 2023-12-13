import { Dropdown, MenuProps } from "antd";
import SignOutIcon from "../icons/SignOutIcon";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { ProfileOutlined } from "@ant-design/icons";

const UserDropdown = () => {
  const items: MenuProps["items"] = [
    {
      label: (
        <Link
          href="/dashboard/profileupdate"
          className="text-[1rem] font-bold flex items-center gap-2"
        >
          Update Profile <ProfileOutlined />
        </Link>
      ),
      key: "profile_update",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button className="text-[1rem] font-bold flex items-center gap-2">
          Sign Out <SignOutIcon />
        </button>
      ),
      key: "logout",
      onClick: () => signOut(),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["hover"]}>
      <div className="cursor-pointer w-[33px] h-[33px] rounded-full relative overflow-hidden border-violet-500 border-[3px] p-[1rem]">
        <Image src="/user.png" fill alt="Profile photo" />
      </div>
    </Dropdown>
  );
};

export default UserDropdown;
