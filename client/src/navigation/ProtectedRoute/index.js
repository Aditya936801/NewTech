import { useSelector } from "react-redux";
import { getAdminData, getToken } from "../../store/auth/authSelector";
import { Navigate } from "react-router-dom";
import { ADMIN_ROUTE } from "../routes/adminRoutes";
import { LANDING_ROUTE } from "../routes/landingRoutes";
const ProtectedRoute = ({ children }) => {
  const token = useSelector(getToken);
  const admin = useSelector(getAdminData);
  const isAuth = token !== "";
  if (isAuth) {
    if (admin?.isMaster) {
      return children;
    } else {
      if(window.location.pathname===ADMIN_ROUTE.adminDashboard)
      {
        return <Navigate to={ADMIN_ROUTE.studentDashboard} />;
      }
      else{
        return children

      }
    }
  }
  return <Navigate to={LANDING_ROUTE.home} />;
};

export default ProtectedRoute;
