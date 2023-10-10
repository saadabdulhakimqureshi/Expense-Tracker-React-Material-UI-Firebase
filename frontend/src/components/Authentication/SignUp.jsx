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
import { registerUser, loginUser } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";

// React
import { useRef, useEffect, useState } from "react";

export default function SignUp() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      nameRef.current.value != "" &&
      emailRef.current.value != "" &&
      passwordRef.current.value != "" &&
      confirmPasswordRef.current.value != ""
    )
      if (passwordRef.current.value == confirmPasswordRef.current.value)
        dispatch(
          registerUser({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            displayName: nameRef.current.value,
          })
        );
      else alert("Please complete the form.");
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
