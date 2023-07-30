import {  useState } from "react";
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
import { useNavigate, NavLink } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import { setLogut } from "../../state";
import "./index.css";
import { Button } from "@mui/material";

const drawerWidth = 240;
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

const Navbar = ({admin=false}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const master = useSelector(state=>state.admin)
  const nav = admin?master?.isMaster?navAdmin:navAdmin.slice(1,3):navUser
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleLogout = ()=>{
    dispatch(
      setLogut()
    )

  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MENU
      </Typography>
      <Divider />
      <List>
        {nav.map((item,index) => (
          <ListItem key={index} disablePadding onClick={()=>navigate(item.link)} >
            <ListItemButton>
              <ListItemText primary={item.name}  />
            </ListItemButton>
          </ListItem>
        ))}
        {
          master?<ListItem disablePadding  onClick={handleLogout} >
          <ListItemButton>
            <ListItemText primary="LOG OUT"  />
          </ListItemButton>
        </ListItem>:<></>
        }
        
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
            sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className={master?"nav-links nav-links-admin ":"nav-links"}>
          {nav.map((item,index) => (
            <NavLink className="nav-link-text"  to={item.link}>
              {item.name}
            </NavLink>
          ))}
          {
            master? <Button variant="contained" color="error" onClick={handleLogout}>
            logout
            </Button>:<></>
          }
         
          
            
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
