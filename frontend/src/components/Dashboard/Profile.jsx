import * as React from "react";
import { IconButton } from "@mui/material";
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
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, CircularProgress } from "@mui/material";
// Redux toolkit
import { updateUser } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

// React
import { useRef, useEffect, useState } from "react";
const defaultTheme = createTheme();

export default function Profile() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const currentUser = useSelector((state) => state.auth.currentUser);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(
      updateUser({
        displayName: nameRef.current.value,
        email: emailRef.current.value,
        passwordRef: passwordRef.current.value,
      })
    );
    setEdit(false);
  };

  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
            {status === "failed" ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <></>
            )}
            {status == "loading" ? (
              <CircularProgress />
            ) : (
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  id="name"
                  label={currentUser.displayName}
                  name="name"
                  disabled
                />
                {edit ? (
                  <TextField
                    margin="normal"
                    fullWidth
                    id="name"
                    label="New Name"
                    name="name"
                    inputRef={nameRef}
                  />
                ) : (
                  <></>
                )}
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label={currentUser.email}
                  name="email"
                  tyoe="email"
                  autoComplete="email"
                  autoFocus
                  disabled
                />
                {edit ? (
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="New Email"
                    name="email"
                    tyoe="email"
                    autoComplete="email"
                    inputRef={emailRef}
                  />
                ) : (
                  <></>
                )}

                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="**********"
                  type="password"
                  id="password"
                  disabled
                />
                {edit ? (
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="New Password"
                    type="password"
                    id="password"
                    inputRef={passwordRef}
                  />
                ) : (
                  <></>
                )}
                {edit ? (
                  <>
                    <Button
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleSubmit}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={toggleEdit}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    endIcon={<EditIcon />}
                    onClick={toggleEdit}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
