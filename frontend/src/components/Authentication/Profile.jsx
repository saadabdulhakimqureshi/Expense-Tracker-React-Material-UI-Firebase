import * as React from "react";

// MUI
import {
  IconButton,
  Alert,
  CircularProgress,
  Stack,
  InputAdornment,
  ButtonGroup,
} from "@mui/material";

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

// Redux toolkit
import { updateUser, reset } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";

// React Router Dom
import { useNavigate } from "react-router-dom";

// React
import { useRef, useState, useEffect } from "react";
const defaultTheme = createTheme();

export default function Profile() {
  // Refs
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const oldPasswordRef = useRef("");

  // States
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
    dispatch(reset());
  };

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Redux
  const currentUser = useSelector((state) => state.auth.currentUser);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();

  // Submit
  const handleSubmit = () => {
    console.log(validationCheck());
    if (validationCheck()) {
      dispatch(
        updateUser({
          displayName: nameRef.current.value,
          email: currentUser.email,
          oldPassword: oldPasswordRef.current.value,
          password: passwordRef.current.value,
        })
      );

      setEdit(false);
    }
  };

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (status == "succeded")
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
  }, [status]);

  const validationCheck = () => {
    setNameError(false);
    setPasswordError(false);
    var check = true;

    if (
      nameRef.current.value == "" &&
      emailRef.current.value == "" &&
      passwordRef.current.value == ""
    ) {
      check = false;
    }

    if (nameRef.current.value != "") {
      if (nameRef.current.value.length < 2) {
        setNameError(true);
        check = false;
      }
      if (nameRef.current.value === currentUser.displayName) {
        check = false;
      }
    }

    if (passwordRef.current.value != "") {
      if (oldPasswordRef.current.value.length < 6) {
        check = false;
      }
      if (passwordRef.current.value.length < 6) {
        setPasswordError(true);
        check = false;
      }
    }
    return check;
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        border: 1,
        padding: 10,
        alignItems: "center",
        flexDirection: "column",
        display: "flex",
        my: "15vh",
        mx: "5vw",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <PersonIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Profile
      </Typography>

      <>
        <TextField
          margin="normal"
          id="email"
          label="Current Email"
          name="email"
          tyoe="email"
          helperText={edit ? "Email cannot be changed" : ""}
          autoComplete="email"
          autoFocus
          disabled
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {currentUser.email}
              </InputAdornment>
            ),
          }}
        />
        {/* {edit ? (
                    <TextField
                      margin="normal"
                      id="email"
                      label="New Email"
                      name="email"
                      fullWidth
                      tyoe="email"
                      autoComplete="email"
                      inputRef={emailRef}
                      error={emailError}
                      helperText={
                        emailError
                          ? "Please enter a valid email"
                          : "Email cannot be same as current."
                      }
                    />
                  ) : (
                    <></>
                  )} */}
        <TextField
          margin="normal"
          id="name"
          label="Current Name"
          name="name"
          fullWidth
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {currentUser.displayName}
              </InputAdornment>
            ),
          }}
        />
        {edit ? (
          <TextField
            margin="normal"
            id="name"
            label="New Name"
            name="name"
            fullWidth
            inputRef={nameRef}
            error={nameError}
            helperText={
              nameError
                ? "Please enter a name of atleast 2 characters."
                : "Name cannot be same as current."
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />
        ) : (
          <></>
        )}

        <TextField
          margin="normal"
          name="password"
          label="Current Password"
          type="password"
          id="password"
          fullWidth
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">********</InputAdornment>
            ),
          }}
        />
        {edit ? (
          <>
            <TextField
              margin="normal"
              name="password"
              label="Old Password"
              type="password"
              id="password"
              fullWidth
              inputRef={oldPasswordRef}
              helperText="Please write your old password before changing."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              name="password"
              label="New Password"
              type="password"
              id="password"
              fullWidth
              inputRef={passwordRef}
              helperText="Password must be atleast 6 characters."
              error={passwordError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
            />
          </>
        ) : (
          <></>
        )}
        <Stack direction={"row"}>
          {status === "loading" ? (
            <CircularProgress />
          ) : edit ? (
            <ButtonGroup orientation="horizontal">
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
            </ButtonGroup>
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
        </Stack>
        {status === "failed" ? (
          <Alert severity="error">{error}</Alert>
        ) : status === "succeded" ? (
          <Alert severity="success">{"Profile Updated!"}</Alert>
        ) : (
          <></>
        )}
      </>
    </Box>
  );
}
