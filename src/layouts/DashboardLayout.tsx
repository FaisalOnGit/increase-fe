import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Icon } from "@/components/ui/Icon";
import { Sidebar } from "@/components/layout/Sidebar";
import { navItems } from "@/data/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
    <div className="min-h-screen bg-background relative">
      {/* Sidebar Component */}
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        }`}
      >
        {/* Header */}
        <header className="bg-background border-b px-4 py-3 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="lg:hidden"
              >
                <Icon name="Menu" size={20} />
              </Button>

              <div>
                <h1 className="text-xl font-semibold text-primary">
                  {pageTitle}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Icon name="Bell" size={20} />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full">
                  3
                </Badge>
              </Button>

              <Separator orientation="vertical" className="h-8" />

              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 bg-primary">
                  <AvatarFallback className="bg-primary text-white">
                    <Icon name="User" size={16} />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-primary">
                    {firstName}
                  </p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Button - Positioned between header and sidebar */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSidebar}
            className={`hidden lg:flex fixed top-8 -translate-y-1/2 w-8 h-8 rounded-full transition-all duration-300 shadow-md`}
            style={{
              left: sidebarCollapsed ? "50px" : "240px",
              zIndex: 100,
            }}
          >
            <Icon
              name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"}
              size={16}
            />
          </Button>
        </header>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-80px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
