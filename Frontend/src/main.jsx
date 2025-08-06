import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

import AppLayout from "./components/AppLayout.jsx";
import CheckAuth from "./components/CheckAuth.jsx";
import Tickets from "./pages/Tickets.jsx";
import Admin from "./pages/Admin.jsx";
import TicketDetailsPage from "./pages/TicketDetailsPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <CheckAuth protectedRoute={false}>
              <Login />
            </CheckAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <CheckAuth protectedRoute={false}>
              <Signup />
            </CheckAuth>
          }
        />

        {/* --- Protected Routes --- */}
        {/* This parent route handles authentication and renders the AppLayout */}
        <Route
          element={
            <CheckAuth protectedRoute={true}>
              <AppLayout />
            </CheckAuth>
          }
        >
          {/* These child routes will now render inside AppLayout's <Outlet /> */}
          <Route path="/dashboard" element={<Tickets />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/tickets/:id" element={<TicketDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
