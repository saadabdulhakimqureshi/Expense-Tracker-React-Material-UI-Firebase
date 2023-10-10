// TODO remove, this demo shouldn't need to reset the theme.
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";

// Redux toolkit
import { registerUser, loginUser, reset } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";

// React
import { useRef, useState, useEffect } from "react";

export default function SignUp() {
  // Refs
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  // States
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  // Redux
  const dispatch = useDispatch();

  // Submitting form
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validationCheck()) {
      dispatch(
        registerUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          displayName: nameRef.current.value,
        })
      );
    }
  };

  // Performing validation checks on fields
  const validationCheck = () => {
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    var check = true;

    if (nameRef.current.value == "") {
      setNameError(true);
      check = false;
    }
    if (emailRef.current.value == "") {
      setEmailError(true);
      check = false;
    }
    if (passwordRef.current.value == "") {
      setPasswordError(true);
      check = false;
    }
    if (confirmPasswordRef.current.value == "") {
      setConfirmPasswordError(true);
      check = false;
    }

    if (nameRef.current.value.length < 2) {
      setNameError(true);
      check = false;
    }

    if (/\S+@\S+\.\S+/.test(emailRef.current.value) == false) {
      setEmailError(true);
      check = false;
    }

    if (passwordRef.current.value.length < 6) {
      setPasswordError(true);
      check = false;
    }
    if (confirmPasswordRef.current.value != passwordRef.current.value) {
      setConfirmPasswordError(true);
      check = false;
    }

    return check;
  };

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <PersonIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          autoFocus
          inputRef={nameRef}
          inputProps={{ maxLength: 30 }}
          error={nameError}
          helperText={
            nameError ? "Please enter a name of atleast 2 characters." : ""
          }
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          inputRef={emailRef}
          error={emailError}
          helperText={emailError ? "Please enter a valid email" : ""}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          inputRef={passwordRef}
          inputProps={{ maxLength: 20 }}
          helperText="Password must be atleast 6 characters."
          error={passwordError}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirm-password"
          label="Confirm Password"
          type="password"
          id="confirm-password"
          inputRef={confirmPasswordRef}
          inputProps={{ maxLength: 20 }}
          helperText={
            confirmPasswordError
              ? "Passwords do not match"
              : "Do not share your password with anyone."
          }
          error={confirmPasswordError}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
        <Grid item>
          <Link href="/login" variant="body2">
            {"Already have an account? Sign In"}
          </Link>
        </Grid>
      </Box>
    </>
  );
}
