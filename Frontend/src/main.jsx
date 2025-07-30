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
            <CheckAdmin protected={true}>
              <Tickets />
            </CheckAdmin>
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <CheckAdmin protected={true}>
              <TicketDetailsPage />
            </CheckAdmin>
          }
        />

        <Route
          path="/login"
          element={
            <CheckAdmin protected={false}>
              <Login />
            </CheckAdmin>
          }
        />

        <Route
          path="/signup"
          element={
            <CheckAdmin protected={false}>
              <Signup />
            </CheckAdmin>
          }
        />
        <Route
          path="/admin"
          element={
            <CheckAdmin protected={true}>
              <Admin />
            </CheckAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
