import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const defaultTheme = createTheme();

// Components
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { Route, Routes } from "react-router-dom";

// React-Redux-Toolkit
import { useSelector, useDispatch } from "react-redux";

export default function Authentication() {
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://www.wellybox.com/wp-content/uploads/2021/01/9-expense-manager-app-1536x1024.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1
              style={{
                position: "absolute", // Position the heading absolutely within the grid
                bottom: 0, // Align it to the bottom
                left: 0, // Align it to the left
                padding: "16px", // Add some padding for spacing
                color: "#fff", // Text color
                background: "rgba(0, 0, 0, 0.5)", // Background color with transparency
              }}
            >
              Expense Tracker
            </h1>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {status === "failed" ? (
                <Alert severity="error">{error}</Alert>
              ) : status === "succeded" ? (
                <Alert severity="success">Successful!</Alert>
              ) : (
                <></>
              )}
              {status === "loading" ? (
                <CircularProgress />
              ) : (
                <Routes>
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<SignIn />} />
                  <Route path="*" element={<SignIn />} />
                </Routes>
              )}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
