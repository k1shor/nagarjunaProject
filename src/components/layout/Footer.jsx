import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-lg font-semibold text-slate-700 mb-3">
              Shop
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              A simple ecommerce platform designed with clean UI and subtle
              modern styling.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Navigation
            </h3>

            <div className="flex flex-col space-y-2 text-sm">
              <Link
                to="/"
                className="text-slate-500 hover:text-sky-700 transition"
              >
                Home
              </Link>

              <Link
                to="/cart"
                className="text-slate-500 hover:text-sky-700 transition"
              >
                Cart
              </Link>

              <Link
                to="/login"
                className="text-slate-500 hover:text-sky-700 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-slate-500 hover:text-sky-700 transition"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Contact
            </h3>

            <div className="text-sm text-slate-500 space-y-2">
              <p>Email: support@shop.com</p>
              <p>Phone: +977 9800000000</p>
              <p>Kathmandu, Nepal</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Newsletter
            </h3>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-3"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
              />

              <button
                type="submit"
                className="bg-sky-600 text-white text-sm py-2 rounded-md hover:bg-sky-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">

          <p>© {new Date().getFullYear()} Shop. All rights reserved.</p>

          {/* Social */}
          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-sky-700 transition">
              Facebook
            </a>
            <a href="#" className="hover:text-sky-700 transition">
              Twitter
            </a>
            <a href="#" className="hover:text-sky-700 transition">
              Instagram
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;