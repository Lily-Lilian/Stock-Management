import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import OfficerDashboard from "./components/Dashboard/OfficerDashboard";
import LoginPage from "./components/Pages/LoginPage";
import Navbar from "./components/Shared/Navbar";
import AddItem from "./components/Stock/AddItem";
import SellItem from "./components/Stock/SellItem";
import ViewItem from "./components/Stock/ViewItems";
import SignupPage from "./components/Pages/SignupPage";



// Helper function for redirect logic
const getRedirectPath = (role) => {
  if (role === "admin") return "/admin";
  if (role === "Stock-officer") return "/officer";
  return "/login";
};

// Protected Route Component
const ProtectedRoute = ({ user, role, children }) => {
  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/login" />;
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser({
      ...userData,
      name: userData.username || "User",
    });
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
         {/* Signup Route */}
         <Route
          path="/signup"
          element={<SignupPage />}
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
      {/* Add Item */}
      <Route
        path="/admin/add-item"
        element={
          user?.role === "admin" ? <AddItem /> : <Navigate to="/login" />
        }
      />

       {/* View Item for Admin */}
       <Route
        path="/admin/view-item"
        element={
          user?.role === "admin"? <ViewItem /> : <Navigate to="/login" />
        }
      />

      
       {/* View Item */}
       <Route
        path="/officer/view-item"
        element={
          user?.role === "Stock-officer"? <ViewItem /> : <Navigate to="/login" />
        }
      />

      {/* Sell Item */}
      <Route
        path="/officer/sell-item"
        element={
          user?.role === "Stock-officer" ? <SellItem /> : <Navigate to="/login" />
        }
      />
        {/* Officer Dashboard Route */}
        <Route
          path="/officer"
          element={
            user?.role === "Stock-officer" ? (
              <OfficerDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
