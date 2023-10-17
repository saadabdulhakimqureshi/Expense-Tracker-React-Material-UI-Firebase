import React from "react";

import NavBar from "./NavBar";
import Profile from "../Authentication/Profile";
import Expenses from "./Expenses";
import {
  Alert,
  CircularProgress,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Stack,
  InputAdornment,
} from "@mui/material";


import { Routes, Route } from "react-router-dom";

export default function Dashboard() {
  return (
    <div
      style={{
        backgroundColor: "#e0e0e0",
        minHeight: "100vh",
        overflow: "auto",
        backgroundRepeat: "repeat-y",
      }}
    >
      <NavBar />
      <Routes>
        <Route path="/home" element={<Expenses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Expenses />} />
      </Routes>
    </div>
  );
}
