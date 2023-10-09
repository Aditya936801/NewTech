import React from 'react'
import {useSelector} from "react-redux"
import { getAdminData, getToken } from "../../store/auth/authSelector";
import { Navigate } from 'react-router-dom';
import {ADMIN_ROUTE} from "../routes/adminRoutes"
const UnprotectedRoute = ({children}) => {
  const token = useSelector(getToken);
  const admin = useSelector(getAdminData);
  const isAuth = token !== ""

  if(isAuth)
  {
    if(admin?.isMaster)
    {
        return <Navigate to={ADMIN_ROUTE.adminDashboard} />
    }
    else{
        return <Navigate to={ADMIN_ROUTE.studentDashboard} />
    }
  }
  return children
}

export default UnprotectedRoute