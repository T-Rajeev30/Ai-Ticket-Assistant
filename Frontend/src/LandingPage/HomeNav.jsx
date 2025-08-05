import React from "react";
import { Link } from "react-router-dom";

function HomeNav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/30">
      <div className="container mx-auto navbar">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl font-bold text-white">AITicket</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 hidden md:flex items-center text-[#A8B2C2]">
            <li>
              <a href="#features" className="hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-white">
                Pricing
              </a>
            </li>
            <Link
              to="/login"
              className="btn btn-ghost text-[#A8B2C2] hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn bg-[#00F5FF] text-black hover:bg-white hover:shadow-lg hover:shadow-[#00F5FF]/50 transition-all ml-2"
            >
              Sign Up
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default HomeNav;
