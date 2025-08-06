import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function AppNav() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "Admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="bg-white/5 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto navbar">
        {/* START: Aligned to the left */}
        <div className="navbar-start">
          <Link
            to="/dashboard"
            className="btn btn-ghost text-xl font-bold text-white"
          >
            AITicket
          </Link>
        </div>

        {/* CENTER: The main navigation links (hidden on small screens) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[#A8B2C2]">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-white bg-white/10" : ""
                }
              >
                My Dashboard
              </NavLink>
            </li>
            {isAdmin && (
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-white/10" : ""
                  }
                >
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* END: Aligned to the right */}
        <div className="navbar-end">
          <button onClick={handleLogout} className="btn btn-outline btn-error">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default AppNav;
