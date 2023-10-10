import React from "react";

import NavBar from "./NavBar";
import Profile from "./Profile";
import Expenses from "./Expenses";
import { Routes, Route } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Expenses />}></Route>
        <Route path="/profile" element={<Profile />}></Route>

        <Route path="*" element={<Profile />}></Route>
      </Routes>
    </>
  );
}
