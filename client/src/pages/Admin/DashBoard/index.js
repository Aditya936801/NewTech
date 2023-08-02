import React from "react";
import "./dashBoard.css";
import Navbar from "../../../components/Navbar";
import { Toolbar } from "@mui/material";
import Mtable from "../../../components/Mtable";
import { Navigate } from "react-router-dom";
import { getToken } from "../../../store/auth/authSelector";
import { useSelector } from "react-redux";
import SearchBar from "../../../components/SearchBar";
import DataTable from "../../../components/DataTable";


const DashBoard = () => {
  const isAuth = useSelector(getToken);

  return (
    <div>
      {isAuth === "" ? (
        <Navigate to="/" />
      ) : (
        <div className="dashboard-wrapper" >
          <Navbar  />
          <Toolbar />
          <SearchBar />
          <DataTable adminTable={true}/>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
