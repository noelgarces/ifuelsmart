import { useAuth0 } from "@auth0/auth0-react";
import logo from "assets/logo-white.png";
import dashboardConfig from "dashboard-config";
import React, { useEffect, useRef, useState } from "react";
import { BsTruckFlatbed } from "react-icons/bs";
import { GiFuelTank } from "react-icons/gi";
import { NavLink, useLocation } from "react-router-dom";
import Header from "./header";

export default function Dashboard({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        html, body, #root {
          height: 100%;
          width: 100%;
        }
        body {
          overflow: hidden;
        }
      `,
        }}
      />
      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 h-full w-[calc(100%-256px)]">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* Main */}
          <main className="px-4 sm:px-6 lg:px-8 py-8 relative bg-gray-100" style={{ height: "calc(100% - 64px)" }}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const page = pathname.split("/")[1];

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const { user } = useAuth0();

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
            {/* Fuel Optimizer */}
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === "" && "bg-gray-900"}`}>
              <NavLink
                to="/"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === "" && "hover:text-gray-200"
                }`}
              >
                <div className="flex flex-grow items-center">
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
                  <span className="text-sm font-medium">Fuel Optimizer</span>
                </div>
              </NavLink>
            </li>
            {/* Fuel Locations */}
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === "fuel-locations" && "bg-gray-900"}`}>
              <NavLink
                to="fuel-locations"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === "campaigns" && "hover:text-gray-200"
                }`}
              >
                <div className="flex flex-grow items-center">
                  <GiFuelTank className="flex-shrink-0 h-6 w-6 mr-3 text-gray-400" />
                  <span className="text-sm font-medium">Fuel Locations</span>
                </div>
              </NavLink>
            </li>
            {/* Tractors */}
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${page === "tractors" && "bg-gray-900"}`}>
              <NavLink
                to="tractors"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === "campaigns" && "hover:text-gray-200"
                }`}
              >
                <div className="flex flex-grow items-center">
                  <BsTruckFlatbed className="flex-shrink-0 h-6 w-6 mr-3 text-gray-400" />
                  <span className="text-sm font-medium">Tractors</span>
                </div>
              </NavLink>
            </li>

            {/* ========= Custome Features Routes ========= */}
            {dashboardConfig[user["https://ifuelsmart.com/company"]].customFeatures.map((feature) => (
              <li
                key={feature.name}
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                  page === feature.route.substring(1) && "bg-gray-900"
                }`}
              >
                <NavLink
                  to={feature.route}
                  className={`block text-gray-200 hover:text-white transition duration-150 ${
                    page === "campaigns" && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex flex-grow items-center">
                    {feature.icon}
                    <span className="text-sm font-medium">{feature.name}</span>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
