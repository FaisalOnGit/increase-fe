import React, { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import { Icon } from "../components/ui/Icon";
import { navItems } from "../data/mockData";
import miniLogo from "/logo.png";
import logo from "/obsesiman.png";
import splash from "./splash.json";

export const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return window.innerWidth < 1024;
  });

  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const firstName = sessionStorage.getItem("firstName");

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Sidebar */}
      <>
        {!sidebarCollapsed && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        <div
          className={`fixed left-0 top-0 h-full bg-primary text-white z-50 transition-all duration-300 ease-in-out flex flex-col ${
            sidebarCollapsed
              ? "-translate-x-full lg:translate-x-0 lg:w-20"
              : "w-60"
          }`}
        >
          <div
            className={`flex items-center p-4 flex-shrink-0 ${
              sidebarCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            <div
              className={`flex ${
                sidebarCollapsed ? "justify-center w-full" : ""
              }`}
            >
              <img
                src={sidebarCollapsed ? miniLogo : logo}
                alt="Logo"
                className={sidebarCollapsed ? "w-8 h-auto" : "w-44 h-auto"}
              />
            </div>

            {!sidebarCollapsed && (
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-lg hover:bg-indigo-800 transition-colors lg:hidden"
              >
                <Icon name="X" size={20} />
              </button>
            )}
          </div>

          <nav className="mt-6 px-3 flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center rounded-lg mb-3 text-lg transition-colors group ${
                    sidebarCollapsed
                      ? "justify-center px-2 py-3"
                      : "space-x-3 px-4 py-2"
                  } ${
                    isActive
                      ? "bg-secondary text-primary"
                      : "text-white hover:bg-indigo-800 hover:text-white"
                  }`}
                  onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                >
                  <Icon
                    name={item.icon as any}
                    size={20}
                    className={`font-bold ${
                      isActive
                        ? "text-primary"
                        : "text-white group-hover:text-white"
                    }`}
                  />
                  {!sidebarCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="px-2 pb-4 flex-shrink-0">
            <button
              className={`flex items-center rounded-lg transition-colors group text-white hover:bg-red-600 hover:text-white w-full ${
                sidebarCollapsed
                  ? "justify-center px-2 py-3"
                  : "space-x-3 px-3 py-3"
              }`}
            >
              <Icon
                name="LogOut"
                size={20}
                className="text-white group-hover:text-white font-bold"
              />
              {!sidebarCollapsed && <span className="font-medium">Keluar</span>}
            </button>
          </div>
        </div>
      </>

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-60"
        }`}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                <Icon name="Menu" size={20} />
              </button>

              <div>
                <h1 className="text-xl font-semibold text-primary">
                  Dashboard
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Icon name="Bell" size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {firstName}
                  </p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Button - Positioned between header and sidebar */}
          <button
            onClick={toggleSidebar}
            className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-md z-50 ${
              sidebarCollapsed ? "left-20" : "left-68"
            }`}
            style={{
              left: sidebarCollapsed ? "-1rem" : "-1rem",
            }}
          >
            <Icon
              name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"}
              size={16}
              className="text-gray-600"
            />
          </button>
        </header>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-80px)]">
          <Outlet />
        </main>
      </div>

      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative z-10 text-center">
            <div className="mb-8">
              <div className="relative">
                <Lottie
                  loop
                  animationData={splash}
                  play
                  style={{ width: 200, height: 200 }}
                />
                <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-2xl animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
