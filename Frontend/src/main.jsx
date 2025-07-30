import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Tickets from "./pages/tickets.jsx";
import CheckAdmin from "./components/CheckAuth.jsx";
import TicketDetailsPage from "./pages/TicketDetailsPage.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Admin from "./pages/admin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CheckAdmin protectedRoute={true}>
              <Tickets />
            </CheckAdmin>
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <CheckAdmin protectedRoute={true}>
              <TicketDetailsPage />
            </CheckAdmin>
          }
        />

        <Route
          path="/login"
          element={
            <CheckAdmin protectedRoute={false}>
              <Login />
            </CheckAdmin>
          }
        />

        <Route
          path="/signup"
          element={
            <CheckAdmin protectedRoute={false}>
              <Signup />
            </CheckAdmin>
          }
        />
        <Route
          path="/admin"
          element={
            <CheckAdmin protectedRoute={true}>
              <Admin />
            </CheckAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
