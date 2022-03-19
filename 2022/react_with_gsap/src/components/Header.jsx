import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
       <div className=" ">
        <Link to="/" className="" >
          LOGO
        </Link>
      </div>
      <nav>
        <ul>
          <li className="inline-block">
            <NavLink
              activeClassName="active"
              className="nav-link px-6 py-4 block hover:text-teal-800"
              to="/"
              exact
            >
              Home
            </NavLink>
          </li>
          <li className="inline-block">
            <NavLink
              activeClassName="active"
              className="nav-link px-6 py-4 block hover:text-teal-800"
              to="/about"
            >
              About Us
            </NavLink>
          </li>
          <li className="inline-block">
            <NavLink
              activeClassName="active"
              className="nav-link px-6 py-4 block hover:text-teal-800"
              to="/contact"
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
     </header>
  );
};

export default Header;
