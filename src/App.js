import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import OfficerDashboard from "./components/Dashboard/OfficerDashboard";
import LoginPage from "./components/Pages/LoginPage";
import Navbar from "./components/Shared/Navbar";

// Helper function for redirect logic
const getRedirectPath = (role) => {
  if (role === "admin") return "/admin";
  if (role === "stock_officer") return "/officer";
  return "/login";
};

// Protected Route Component
const ProtectedRoute = ({ user, role, children }) => {
  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/login" />;
  return children;
};

const App = () => {
  const [user, setUser] = useState(null); // State to manage the logged-in user

  const handleLogin = (userData) => {
    setUser(userData); // Update user state on login
  };

  const handleLogout = () => {
    setUser(null); // Clear user state on logout
  };

  return (
    <Router>
      {/* Show Navbar only if the user is logged in */}
      {user && <Navbar user={user} notifications={user?.notifications || []} onLogout={handleLogout} />}

      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to={getRedirectPath(user.role)} />
            ) : (
              <LoginPage setUser={handleLogin} />
            )
          }
        />

        {/* Admin Dashboard Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} role="admin">
              <AdminDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* Officer Dashboard Route */}
        <Route
          path="/officer"
          element={
            <ProtectedRoute user={user} role="stock_officer">
              <OfficerDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
