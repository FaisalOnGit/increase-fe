import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { navItems } from "../../data/mockData";
import miniLogo from "/simanislite.png";
import logo from "/simanis.png";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const firstName = localStorage.getItem("firstName");

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              ? "-translate-x-full lg:translate-x-0 lg:w-16"
              : "w-64"
          }`}
        >
          <div className="flex items-center justify-between p-4 flex-shrink-0">
            <img
              src={sidebarCollapsed ? miniLogo : logo}
              alt="Logo"
              className={sidebarCollapsed ? "w-12 h-auto" : "w-48 h-auto"}
            />

            <button
              onClick={toggleSidebar}
              className="p-1 rounded-lg hover:bg-indigo-800 transition-colors lg:hidden"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <nav className="mt-6 px-2 flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg mb-1 transition-colors group ${
                    isActive
                      ? "bg-secondary text-primary"
                      : "text-white hover:bg-indigo-800 hover:text-white"
                  }`}
                  onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                >
                  <Icon
                    name={item.icon as any}
                    size={20}
                    className={
                      isActive
                        ? "text-primary"
                        : "text-white group-hover:text-white"
                    }
                  />
                  {!sidebarCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="px-2 pb-4 flex-shrink-0">
            <button className="flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors group text-white hover:bg-red-600 hover:text-white w-full">
              <Icon
                name="LogOut"
                size={20}
                className="text-white group-hover:text-white"
              />
              {!sidebarCollapsed && <span className="font-medium">Keluar</span>}
            </button>
          </div>
        </div>
      </>

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                <Icon name="Menu" size={20} />
              </button>

              <button
                onClick={toggleSidebar}
                className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Icon
                  name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"}
                  size={20}
                />
              </button>

              <div>
                <h1 className="text-xl font-semibold text-gray-900">
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
                  <p className="text-sm font-medium text-primary">
                    {firstName}
                  </p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};
