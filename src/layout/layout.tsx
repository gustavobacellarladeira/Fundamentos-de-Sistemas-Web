import React, { ReactNode } from "react";
import { MyNavbar } from "./Navbar/Navbar";
import "./styles.css";
import Footer from "./Footer/Footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="wrapper">
      <MyNavbar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};
