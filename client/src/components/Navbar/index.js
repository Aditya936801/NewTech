import { useEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material";
import "./index.css";

const drawerWidth = 240;

const Navbar = () => {
  const navItems = ["home", "registration", "certificate", "about", "contact"];
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [alignment, setAlignment] = useState("home");
  // const StyleToggleButton = styled(ToggleButton)(({ theme }) => ({
  //   border: "none",
  //   borderRadius:0,
  //   backgroundColor: theme.palette.primary.main,
  //   color: "#fff",
  //   margin: "0 8px",
  //   "&:hover": {
  //     backgroundColor: "#fff",
  //     color: theme.palette.primary.main
  //   },
  //   "&.Mui-selected": {
  //     backgroundColor: "#fff",
  //     color: theme.palette.primary.main,
  //     "&:hover": {
  //       backgroundColor: "#fff",
  //       color: theme.palette.primary.main
  //     },
  //   }
  // }));

 

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MENU
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            NewTech
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="nav-links">
            {navItems?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setAlignment(item)
                    navigate(`/${item}`)
                  }}
                  className={
                    item === alignment
                      ? "nav-link-text-selected"
                      : "nav-link-text"
                  }
                >
                  {item}
                </div>
              );
            })}
          </div>
        </Toolbar>
      </AppBar>

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
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
