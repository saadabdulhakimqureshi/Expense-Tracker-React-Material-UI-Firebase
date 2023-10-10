import React, { useState } from "react";
import {
  Button,
  AppBar,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { logout } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";

const defaultTheme = createTheme();

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer} // Added onClick to open the drawer
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Expense-App
          </Typography>
          <div style={{ flexGrow: 1 }}></div>

          <Button variant="contained" color="secondary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer}>
        <div
          style={{
            width: 240,
          }}
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <ListItem>
              <Button
                startIcon={<DashboardIcon />}
                variant="text"
                component={Link}
                to="/home"
              >
                Dashboard
              </Button>
            </ListItem>
            <ListItem>
              <Button
                startIcon={<PersonIcon />}
                variant="text"
                component={Link}
                to="/profile"
              >
                Profile
              </Button>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
