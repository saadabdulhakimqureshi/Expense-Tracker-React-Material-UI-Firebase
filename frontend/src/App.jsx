import "./App.css";

// Components
import Authentication from "./components/Authentication/Authentication";
import Dashboard from "./components/Dashboard/Dashboard";

// Firebase
import app from "./firebase";
import { auth, firestore } from "./firebase";

// React-Router-Dom
import { Routes, Route } from "react-router-dom";

// React-Redux-Toolkit
import { useSelector, useDispatch } from "react-redux";

function App() {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return <>{currentUser ? <Dashboard /> : <Authentication />}</>;
}

export default App;
