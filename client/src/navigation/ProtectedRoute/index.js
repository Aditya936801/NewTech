import { useSelector } from "react-redux";
import { getAdminData, getToken } from "../../store/auth/authSelector";
import { Navigate } from "react-router-dom";
import { ADMIN_ROUTE } from "../routes/adminRoutes";
import { LOGIN_ROUTE } from "../routes/loginRoutes";
const ProtectedRoute = ({ children }) => {
  const token = useSelector(getToken);
  const admin = useSelector(getAdminData);
  const isAuth = token !== "";
  if (isAuth) {
    if (admin?.isMaster) {
      return children;
    } else {
      if(window.location.pathname===ADMIN_ROUTE.dashboard)
      {
        return <Navigate to={LOGIN_ROUTE.home} />;

      }
      else{
        return children

      }
    }
  }
  return <Navigate to={LOGIN_ROUTE.home} />;
};

export default ProtectedRoute;
