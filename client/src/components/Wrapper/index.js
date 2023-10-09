import React from "react";
import Basicfooter from "../Footer";
import Navbar from "../Navbar";
import { Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import { getToken } from "../../store/auth/authSelector";

const Wrapper = ({ children }) => {
  const token = useSelector(getToken);
  const isAuth = token !== "";
  return (
    <div>
      <Navbar />
      <Toolbar />
      {children}
      {!isAuth && <Basicfooter />}
    </div>
  );
};

export default Wrapper;
