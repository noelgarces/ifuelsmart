import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import logo from "assets/logo-white.png";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Cards */}
            <div className="grid grid-cols-12 gap-6"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const page = pathname.split("/")[1];

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="lg:w-64">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 bg-gray-800 p-4 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink to="/" className="block">
            <img src={logo} alt="" width="175" />
          </NavLink>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">Pages</h3>
          <ul className="mt-3">
            {/* Dashboard */}
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === "" && "bg-gray-900"}`}>
              <NavLink
                to="/"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === "" && "hover:text-gray-200"
                }`}
              >
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path
                      className={`fill-current text-gray-400 ${page === "" && "text-orange-500"}`}
                      d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                    />
                    <path
                      className={`fill-current text-gray-600 ${page === "" && "text-orange-600"}`}
                      d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                    />
                    <path
                      className={`fill-current text-gray-400 ${page === "" && "text-orange-200"}`}
                      d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Fuel Navigator</span>
                </div>
              </NavLink>
            </li>
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === "campaigns" && "bg-gray-900"}`}>
              <NavLink
                to="/"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === "campaigns" && "hover:text-gray-200"
                }`}
              >
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path
                      className={`fill-current text-gray-600 ${page === "campaigns" && "text-orange-500"}`}
                      d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"
                    />
                    <path
                      className={`fill-current text-gray-400 ${page === "campaigns" && "text-orange-300"}`}
                      d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Fuel Prices</span>
                </div>
              </NavLink>
            </li>
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === "tasks" && "bg-gray-900"}`}>
              <NavLink
                to="/"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === "tasks" && "hover:text-gray-200"
                }`}
              >
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path
                      className={`fill-current text-gray-600 ${page === "tasks" && "text-orange-500"}`}
                      d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
                    />
                    <path
                      className={`fill-current text-gray-600 ${page === "tasks" && "text-orange-500"}`}
                      d="M1 1h22v23H1z"
                    />
                    <path
                      className={`fill-current text-gray-400 ${page === "tasks" && "text-orange-300"}`}
                      d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Fuel Purchases</span>
                </div>
              </NavLink>
            </li>
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === "settings" && "bg-gray-900"}`}>
              <NavLink
                to="/"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === "settings" && "hover:text-gray-200"
                }`}
              >
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path
                      className={`fill-current text-gray-600 ${page === "settings" && "text-orange-500"}`}
                      d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
                    />
                    <path
                      className={`fill-current text-gray-400 ${page === "settings" && "text-orange-300"}`}
                      d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
                    />
                    <path
                      className={`fill-current text-gray-600 ${page === "settings" && "text-orange-500"}`}
                      d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
                    />
                    <path
                      className={`fill-current text-gray-400 ${page === "settings" && "text-orange-300"}`}
                      d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Purchase Exceptions</span>
                </div>
              </NavLink>
            </li>
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === "messages" && "bg-gray-900"}`}>
              <NavLink
                to="/"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === "messages" && "hover:text-gray-200"
                }`}
              >
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path
                      className={`fill-current text-gray-400 ${page === "orders" && "text-orange-300"}`}
                      d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                    />
                    <path
                      className={`fill-current text-gray-700 ${page === "orders" && "text-orange-600"}`}
                      d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                    />
                    <path
                      className={`fill-current text-gray-600 ${page === "orders" && "text-orange-500"}`}
                      d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Fuel Cards</span>
                </div>
              </NavLink>
            </li>
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === "customers" && "bg-gray-900"}`}>
              <NavLink
                to="/"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === "customers" && "hover:text-gray-200"
                }`}
              >
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <path
                      className={`fill-current text-gray-400 ${page === "customers" && "text-orange-300"}`}
                      d="M7 0l6 7H8v10H6V7H1z"
                    />
                    <path
                      className={`fill-current text-gray-600 ${page === "customers" && "text-orange-500"}`}
                      d="M18 7v10h5l-6 7-6-7h5V7z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Miles Per Gallon</span>
                </div>
              </NavLink>
            </li>
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === "applications" && "bg-gray-900"}`}>
              <NavLink
                to="/"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === "applications" && "hover:text-gray-200"
                }`}
              >
                <div className="flex flex-grow">
                  <svg className="flex-shrink-0 h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <circle
                      className={`fill-current text-gray-400 ${page === "applications" && "text-orange-300"}`}
                      cx="18.5"
                      cy="5.5"
                      r="4.5"
                    />
                    <circle
                      className={`fill-current text-gray-600 ${page === "applications" && "text-orange-500"}`}
                      cx="5.5"
                      cy="5.5"
                      r="4.5"
                    />
                    <circle
                      className={`fill-current text-gray-600 ${page === "applications" && "text-orange-500"}`}
                      cx="18.5"
                      cy="18.5"
                      r="4.5"
                    />
                    <circle
                      className={`fill-current text-gray-400 ${page === "applications" && "text-orange-300"}`}
                      cx="5.5"
                      cy="18.5"
                      r="4.5"
                    />
                  </svg>
                  <span className="text-sm font-medium">Goal</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
