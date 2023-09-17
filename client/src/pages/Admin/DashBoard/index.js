import "./dashBoard.css";
import Navbar from "../../../components/Navbar";
import { Toolbar } from "@mui/material";

import DataTable from "../../../components/DataTable";


const DashBoard = () => {
 
  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <Toolbar />
      
      <DataTable adminTable={true}    />
    </div>
  );
};

export default DashBoard;
