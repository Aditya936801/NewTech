import "./studentDashBoard.css";
import Wrapper from "../../../components/Wrapper";
import DataTable from "../../../components/DataTable";

const StudentDashboard = () => {
  return (
    <Wrapper>
    <div className="student-dashboard-wrapper">
    <DataTable tableType="student"/>
    </div>
    </Wrapper>
  )
}

export default StudentDashboard