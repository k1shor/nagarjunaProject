import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "text-sky-700 bg-sky-100"
        : "text-slate-600 hover:text-sky-700 hover:bg-sky-50"
    }`;

    const {cart_items} = useSelector(store => store.cartStore)

    const length = cart_items?.length


  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="text-lg font-semibold text-slate-700 tracking-wide">
            Shop
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>

            <NavLink to="/cart" className={linkClass}>
              Cart (<span>{length}</span>)
            </NavLink>

            <NavLink
              to="/login"
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-sky-700 transition"
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="px-4 py-2 text-sm font-medium bg-sky-600 text-white rounded-md hover:bg-sky-700 transition"
            >
              Register
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-600 text-xl"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-slate-200 py-3 space-y-2">
            <NavLink
              to="/"
              className="block px-2 py-2 text-slate-600 hover:text-sky-700"
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/cart"
              className="block px-2 py-2 text-slate-600 hover:text-sky-700"
              onClick={() => setOpen(false)}
            >
              Cart
            </NavLink>

            <NavLink
              to="/login"
              className="block px-2 py-2 text-slate-600 hover:text-sky-700"
              onClick={() => setOpen(false)}
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="block px-2 py-2 text-slate-600 hover:text-sky-700"
              onClick={() => setOpen(false)}
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;