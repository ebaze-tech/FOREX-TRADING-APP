import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Function to close the menu on link click
  const closeMenu = () => setOpen(true);

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex justify-between items-center bg-white py-4 md:px-10 px-7">
        <Link className="cursor-pointer" to="/">
          <img src="/images/ufxlogo.png" alt="Logo" className="h-24" />
        </Link>
        <div
          onClick={() => setOpen(!open)}
          className="text-6xl absolute right-8 top-9 cursor-pointer text-[#008000] md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 opacity-100" : "top-[-490px] opacity-0"
          } md:opacity-100`}
        >
          <li className="md:ml-8 text-2xl md:my-0 my-7">
            <Link
              to="/"
              className="text-[#008000] hover:text-gray-400 duration-500"
              onClick={closeMenu}
            >
              HOME
            </Link>
          </li>
          <li className="md:ml-8 text-2xl md:my-0 my-7">
            <Link
              to="/register"
              className="text-[#008000] hover:text-gray-400 duration-500"
              onClick={closeMenu}
            >
              SERVICES
            </Link>
          </li>
          <li className="md:ml-8 text-2xl md:my-0 my-7">
            <Link
              to="/contact"
              className="text-[#008000] hover:text-gray-400 duration-500"
              onClick={closeMenu}
            >
              CONTACT
            </Link>
          </li>
          <li className="md:ml-8 text-2xl md:my-0 my-7">
            <button
              className="bg-[#fb0200] text-white py-2 px-6 rounded hover:bg-[#006b80] duration-500"
              onClick={closeMenu}
            >
              <Link to="/register" className="text-2xl uppercase">
                Get Started
              </Link>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
