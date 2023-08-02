import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {  NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../store/auth/authReducer";
import "./navbar.css";
import { Button } from "@mui/material";
import { checkForAdmin } from "./utility";
import { getAdminData,getToken } from "../../store/auth/authSelector";
import MuiDrawer from "./miniComponent/MuiDrawer";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const admin = useSelector(getAdminData);
  const token = useSelector(getToken);
  const isAuth = token !== "";
  const nav = checkForAdmin(isAuth,admin);
  const dispatch = useDispatch();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <Box display="flex">
      <AppBar>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            NewTech
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className={isAuth ? "nav-links nav-links-admin " : "nav-links"}>
            {nav.map((item, index) => (
              <NavLink key={index} className="nav-link-text" to={item.link}>
                {item.name}
              </NavLink>
            ))}
            {isAuth &&
              <Button variant="contained" color="error" onClick={handleLogout}>
                logout
              </Button>
           }
          </div>
        </Toolbar>
      </AppBar>
      <MuiDrawer
        handleLogout={handleLogout}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
    </Box>
  );
};

export default Navbar;
