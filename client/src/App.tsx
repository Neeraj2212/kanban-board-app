import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import KanbanBoardPage from "@pages/KanbanBoardPage";
import Login from "@pages/Login";
import SignUp from "@pages/SignUp";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

function App() {
  const { user } = useContext(UserContext);
  // Axios config to send cookies with every request
  axios.defaults.withCredentials = true;
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* This route will only be available if the user is logged in */}
          {user && <Route path="/board" element={<KanbanBoardPage />} />}

          {/* Redirect to login page if no other route matches */}
          <Route path="/*" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
