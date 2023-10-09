import "./studentDashBoard.css";
import Navbar from "../../../components/Navbar";
import { Toolbar } from "@mui/material";
import DataTable from "../../../components/DataTable";

const StudentDashboard = () => {
  return (
    <div className="student-dashboard-wrapper">
    <Navbar />
    <Toolbar />
    <DataTable adminTable={false}/>
  </div>
  )
}

export default StudentDashboard