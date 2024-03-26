import React, { ReactNode } from "react";
import { MyNavbar } from "./Navbar/Navbar";
import "./styles.css";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <MyNavbar />
      {children}
    </>
  );
};
