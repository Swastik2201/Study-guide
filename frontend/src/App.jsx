import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import StudyTimeline from "./pages/StudyTimeline";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <BrowserRouter>

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
        }}
      >

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            backgroundColor: "#f7f7f7",
          }}
        >

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

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;