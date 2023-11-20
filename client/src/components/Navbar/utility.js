import {LANDING_ROUTE} from "../../navigation/routes/landingRoutes"
import {ADMIN_ROUTE} from "../../navigation/routes/adminRoutes"
const navUser = [
    {
      name:"HOME",
      link:LANDING_ROUTE.home,
    },
    {
      name:"REGISTRATION",
      link:"/registration",
    },
    {
      name:"CERTIFICATE",
      link:"/certificate",
    },
  ];
  const navAdmin = [
    {
      name:"DASHBOARD",
      link:ADMIN_ROUTE.adminDashboard,
    },
    {
      name:"STUDENT",
      link:ADMIN_ROUTE.studentDashboard,
    },
    {
      name:"CERTIFICATE",
      link:ADMIN_ROUTE.certificateDashboard,
    },
  ]

  export const checkForAdmin=(isAuth,admin)=>{
   
    if(isAuth)
    {
        if(admin?.isMaster)
        {
            return navAdmin
        }
        return navAdmin.slice(1,3)
    }
    return navUser
  }