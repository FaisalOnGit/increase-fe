import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Icon } from "../components/ui/Icon";
import { Sidebar } from "../components/layout/Sidebar";
import { navItems } from "../data/mockData";

const findPageTitle = (pathname: string): string => {
  // Check direct path matches
  for (const item of navItems) {
    if (item.path === pathname) {
      return item.label;
    }

    // Check in children/submenu
    if (item.children) {
      for (const child of item.children) {
        if (child.path === pathname) {
          return child.label;
        }
      }
    }
  }

  // Default title based on path
  if (pathname === "/dashboard") return "Dashboard";

  // Extract title from path
  const segments = pathname.split("/");
  const lastSegment = segments[segments.length - 1];
  if (lastSegment) {
    return (
      lastSegment.charAt(0).toUpperCase() +
      lastSegment.slice(1).replace(/-/g, " ")
    );
  }

  return "Dashboard";
};

export const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return window.innerWidth < 1024;
  });

  const location = useLocation();
  const firstName = sessionStorage.getItem("firstName") || "User";
  const pageTitle = findPageTitle(location.pathname);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Sidebar Component */}
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
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
                  {pageTitle}
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

          {/* Toggle Button - Positioned between header and sidebar */}
          <button
            onClick={toggleSidebar}
            className={`hidden lg:flex fixed top-8 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-lg`}
            style={{
              left: sidebarCollapsed ? "50px" : "240px",
              zIndex: 100,
            }}
          >
            <Icon
              name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"}
              size={20}
              className="text-gray-600"
            />
          </button>
        </header>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-80px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
