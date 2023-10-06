import React from "react";
import {
  Box,
  Typography,
  Divider,
  ListItemText,
  ListItemButton,
  ListItem,
  List,
  Drawer,
} from "@mui/material";
import {getAdminData,getToken} from "../../../../store/auth/authSelector"
import {useSelector} from "react-redux"
import { checkForAdmin } from "../../utility";
import { useNavigate } from "react-router-dom";
import "../../navbar.css"



const drawerWidth = 240;
const MuiDrawer = ({mobileOpen,handleDrawerToggle,handleLogout}) => {
  const admin = useSelector(getAdminData)
  const token = useSelector(getToken);
  const isAuth = token !== ""
  const nav = checkForAdmin(isAuth,admin)
  const navigate = useNavigate()
  
  return (
    <Drawer
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      <Box onClick={handleDrawerToggle} className="menu-drawer" textAlign="center">
        <Typography variant="h6" sx={{ my: 2 }}>
          MENU
        </Typography>
        <Divider />
        <List>
          {nav.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              onClick={() => navigate(item.link)}
            >
              <ListItemButton>
                <ListItemText primary={item.name} color="primary" />
              </ListItemButton>
            </ListItem>
          ))}
          {isAuth && (
            <ListItem disablePadding onClick={handleLogout}>
              <ListItemButton>
                <ListItemText primary="LOG OUT" />
              </ListItemButton>
            </ListItem>
          ) }
        </List>
      </Box>
    </Drawer>
  );
};

export default MuiDrawer;
