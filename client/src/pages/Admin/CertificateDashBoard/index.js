import "./certificateDashBoard.css";
import DataTable from "../../../components/DataTable";
import Wrapper from "../../../components/Wrapper";

const CertificateDashBoard = () => {
  return (
    <Wrapper>
    <div className="certificate-dashboard-wrapper">
    <DataTable tableType="certificate"    />
    </div>
    </Wrapper>
  )
}

export default CertificateDashBoard