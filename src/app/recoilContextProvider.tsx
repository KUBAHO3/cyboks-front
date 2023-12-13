"use client";
import { RecoilRoot, atom } from "recoil";

export const exempleState = atom({
  key: "Example",
  default: [],
});

const RecoilContextProvider: React.FC<RecoilContextProviderProps> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default RecoilContextProvider;