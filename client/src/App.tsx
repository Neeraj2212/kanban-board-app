import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import KanbanBoardPage from "@pages/KanbanBoardPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<KanbanBoardPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
