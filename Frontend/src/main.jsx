import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Tickets from "./pages/Tickets.jsx";
import CheckAdmin from "./components/CheckAuth.jsx";
import TicketDetailsPage from "./pages/TicketDetailsPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Admin from "./pages/Admin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
