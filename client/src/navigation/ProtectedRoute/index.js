import React from 'react'
import {useSelector} from "react-redux"
import { getAdminData, getToken } from "../../store/auth/authSelector";
import { Navigate } from 'react-router-dom';
import {ADMIN_ROUTE} from "../routes/adminRoutes"
const ProtectedRoute = ({children}) => {
  const token = useSelector(getToken);
  const admin = useSelector(getAdminData);
  const isAuth = token !== ""
  console.log(token)
  console.log(admin)
  if(isAuth)
  {
    if(admin?.isMaster)
    {
        return <Navigate to={ADMIN_ROUTE.dashboard} />
    }
    else{
        return <div></div>
    }
  }
  return children
}

export default ProtectedRoute