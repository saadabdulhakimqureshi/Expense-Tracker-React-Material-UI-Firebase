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
  Stack,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// React-Router-Dom
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

// Reduxtoolkit
import { logout } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";

const defaultTheme = createTheme();

export default function NavBar() {
  // States
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Router
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

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
            Expense Tracker
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <Stack direction={"row"} spacing={2}>
            <Typography variant="h5">{currentUser.displayName}</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Stack>
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
