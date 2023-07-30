import React from "react";
import "./index.css";
import Navbar from "../../../components/Navbar";
import { Toolbar } from "@mui/material";
import Mtable from "../../../components/Mtable";
import CustomSnackbar from "../../../components/CustomSnackbar"


const DashBoard = () => {
  return (
    <div>
      <Navbar admin={true} />
      <Toolbar />
      <Mtable />
      <CustomSnackbar/>
    </div>
  );
};

export default DashBoard;
