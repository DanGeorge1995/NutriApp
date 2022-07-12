import React from "react";
import Navbar from "../../components/Navigation/Navbar";
import { useDarkMode } from "../../custom-hooks/useDarkMode";

const PageLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default PageLayout;
