import React from "react";
import "./dashBoard.css";
import Navbar from "../../../components/Navbar";
import { Toolbar } from "@mui/material";
import SearchBar from "../../../components/SearchBar";
import DataTable from "../../../components/DataTable";


const DashBoard = () => {
  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <Toolbar />
      <SearchBar />
      <DataTable adminTable={true} />
    </div>
  );
};

export default DashBoard;
