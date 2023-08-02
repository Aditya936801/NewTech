const navUser = [
    {
      name:"HOME",
      link:"/",
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
      link:"/admin/dashboard",
    },
    {
      name:"STUDENT",
      link:"/admin/student",
    },
    {
      name:"CERTIFICATE",
      link:"/admin/certificate",
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