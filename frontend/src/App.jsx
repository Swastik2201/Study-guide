import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import StudyTimeline from "./pages/StudyTimeline";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";
import SessionSummary from "./pages/SessionSummary";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/timeline"
          element={<StudyTimeline />}
        />

        <Route
          path="/flashcards"
          element={<Flashcards />}
        />

        <Route
          path="/quiz"
          element={<Quiz />}
        />

        <Route
          path="/summary"
          element={<SessionSummary />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;