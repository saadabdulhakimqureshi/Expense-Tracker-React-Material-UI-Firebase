// MUI
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
import { Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//React-Router-Dom
import { useNavigate } from "react-router-dom";

// ReduxToolkit
import { registerUser, loginUser, reset } from "../../features/authSlice";
import { useSelector, useDispatch } from "react-redux";

// React
import { useRef, useState, useEffect } from "react";

export default function SignIn() {
  // Refs
  const emailRef = useRef("");
  const passwordRef = useRef("");

  // States
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Redux
  const dispatch = useDispatch();

  // Router
  const navigate = useNavigate();

  // SUbmitting form
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validationCheck()) {
      dispatch(
        loginUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );

      
    }
  };

  // Performing validation checks on fields
  const validationCheck = () => {
    setEmailError(false);
    setPasswordError(false);

    var check = true;

    if (/\S+@\S+\.\S+/.test(emailRef.current.value) == false) {
      setEmailError(true);
      check = false;
    }
    if (passwordRef.current.value.length < 6) {
      setPasswordError(true);
      check = false;
    }

    return check;
  };

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "e0e0e0" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
          autoComplete="current-password"
          inputRef={passwordRef}
          inputProps={{ maxLength: 20 }}
          helperText="Password must be atleast 6 characters."
          error={passwordError}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
