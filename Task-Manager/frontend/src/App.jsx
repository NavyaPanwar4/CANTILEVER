import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Homepage";
import ThemeVerifier from "./ThemeVerifier";
import { Toaster } from 'react-hot-toast';
import { TaskProvider } from './context/TaskContext'; 
import Layout from "./components/Layout"; // NEW

import "./styles/global.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey && e.key === "n") {
        console.log("Create new task shortcut triggered");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div data-theme={darkMode ? "dark" : "light"}>
      <ThemeVerifier />
      <TaskProvider>
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          {/* ✅ Wrap ALL task-related routes in Layout */}
          <Route
            path="/"
            element={<Layout darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />}
          >
            {/* Default */}
            <Route index element={<Navigate to="/tasks/inbox" replace />} />
            {/* Inbox, Today, Important, Upcoming */}
            <Route path="tasks/:section" element={<HomePage />} />
          </Route>

          {/* ❌ Fallback route (outside layout) */}
          <Route path="*" element={<p className="text-center mt-10">404 — Not Found</p>} />
        </Routes>
      </TaskProvider>
    </div>
  );
}
