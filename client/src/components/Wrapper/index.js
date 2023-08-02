import React from "react";
import Basicfooter from "../Footer";
import Navbar from "../Navbar";
import { Toolbar } from "@mui/material";

const Wrapper = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Toolbar />
      {children}
      <Basicfooter />
    </div>
  );
};

export default Wrapper;
