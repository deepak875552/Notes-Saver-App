import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg p-4">
      <div className="flex flex-row gap-8 justify-center">
        <NavLink
          className="text-white font-semibold text-lg transform transition duration-300 ease-in-out hover:scale-110 hover:text-yellow-300 hover:shadow-md hover:shadow-yellow-300/50"
          to="/"
          activeClassName="underline underline-offset-4"
        >
          Home
        </NavLink>
        <NavLink
          className="text-white font-semibold text-lg transform transition duration-300 ease-in-out hover:scale-110 hover:text-yellow-300 hover:shadow-md hover:shadow-yellow-300/50"
          to="/pastes"
          activeClassName="underline underline-offset-4"
        >
          All Notes
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
