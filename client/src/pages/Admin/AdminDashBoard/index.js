import "./adminDashBoard.css";
import DataTable from "../../../components/DataTable";
import Wrapper from "../../../components/Wrapper";


const AdminDashBoard = () => {
 
  return (
    <Wrapper>
    <div className="admin-dashboard-wrapper">

    <DataTable adminTable={true}    />
    </div>
    </Wrapper>
  );
};

export default AdminDashBoard;
