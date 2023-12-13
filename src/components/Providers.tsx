"use client";

import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

import "react-toastify/dist/ReactToastify.css";
import antdTheme from "@/themes/antd";
import { ConfigProvider } from "antd";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <ToastContainer autoClose={2500} />
      <RecoilRoot>
        <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
      </RecoilRoot>
    </SessionProvider>
  );
};

export default Providers;
