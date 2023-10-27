import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import KanbanBoardPage from "@pages/KanbanBoardPage";
import Login from "@pages/Login";
import SignUp from "@pages/SignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="*" element={<KanbanBoardPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
