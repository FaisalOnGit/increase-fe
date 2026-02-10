import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Icon } from "@/components/ui/Icon";
import { Sidebar } from "@/components/layout/Sidebar";
import { navItems } from "@/data/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/hooks/useNotifications";
import { Notification } from "@/types/api.types";

// Helper function to capitalize first letter
const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

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

// Format notification time
const formatNotificationTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays < 7) return `${diffDays} hari yang lalu`;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
};

// Get notification icon based on type
const getNotificationIcon = (type: string) => {
  switch (type) {
    case "success":
      return "CheckCircle";
    case "warning":
      return "AlertTriangle";
    case "error":
      return "XCircle";
    default:
      return "Info";
  }
};

// Get notification icon color based on type
const getNotificationIconColor = (type: string) => {
  switch (type) {
    case "success":
      return "text-green-500";
    case "warning":
      return "text-yellow-500";
    case "error":
      return "text-red-500";
    default:
      return "text-blue-500";
  }
};

export const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return window.innerWidth < 1024;
  });
  const [notifOpen, setNotifOpen] = useState(false);

  const location = useLocation();
  const { user } = useAuth();
  const pageTitle = findPageTitle(location.pathname);

  // Get user display name - fallback to "User" if not available
  const displayName = user?.name || "User";

  // Get user role display name from roles array or role string
  // Fallback to capitalized name if role is not available
  const roleDisplay =
    user?.roles && user.roles.length > 0
      ? user.roles[0].display_name
      : user?.role
        ? capitalizeFirstLetter(user.role)
        : capitalizeFirstLetter(displayName);

  // Notifications hook - only fetch unread for count, all for dropdown
  const {
    notifications,
    unreadCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    fetchUnreadCount,
  } = useNotifications({ per_page: 10, unread_only: false });

  // Store fetchUnreadCount in ref to avoid re-creating interval
  const fetchUnreadCountRef = useRef(fetchUnreadCount);
  useEffect(() => {
    fetchUnreadCountRef.current = fetchUnreadCount;
  }, [fetchUnreadCount]);

  // Refresh unread count periodically (only when dropdown is closed)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!notifOpen) {
        fetchUnreadCountRef.current();
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [notifOpen]); // Only depend on notifOpen

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMarkAsRead = async (id: number) => {
    await markNotificationAsRead(id);
  };

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsRead();
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
        <header className="sticky top-0 z-[70] bg-background border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="lg:hidden hover:bg-primary hover:text-white"
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
              {/* Notifications Dropdown */}
              <DropdownMenu open={notifOpen} onOpenChange={setNotifOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="Bell" size={20} />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full bg-destructive text-white">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-80 max-h-[400px] flex flex-col"
                >
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span>Notifikasi</span>
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-xs text-primary hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAllAsRead();
                        }}
                      >
                        Tandai semua dibaca
                      </Button>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Notifications List */}
                  <div className="overflow-y-auto max-h-[320px]">
                    {notifications.length === 0 ? (
                      <div className="py-8 px-4 text-center text-muted-foreground text-sm">
                        <Icon name="Bell" size={32} className="mx-auto mb-2 opacity-50" />
                        <p>Tidak ada notifikasi</p>
                      </div>
                    ) : (
                      notifications.map((notif: Notification) => (
                        <DropdownMenuItem
                          key={notif.id}
                          className={`flex items-start gap-3 p-3 cursor-pointer ${
                            !notif.read_at ? "bg-accent/50" : ""
                          }`}
                          onClick={() => handleMarkAsRead(notif.id)}
                        >
                          <div
                            className={`mt-0.5 ${getNotificationIconColor(
                              notif.type
                            )}`}
                          >
                            <Icon name={getNotificationIcon(notif.type)} size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {notif.title}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {notif.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatNotificationTime(notif.created_at)}
                            </p>
                          </div>
                          {!notif.read_at && (
                            <div className="mt-1">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                            </div>
                          )}
                        </DropdownMenuItem>
                      ))
                    )}
                  </div>

                  {notifications.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <div className="p-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            setNotifOpen(false);
                            // Navigate to notifications page if exists
                            // navigate("/notifications");
                          }}
                        >
                          Lihat Semua
                        </Button>
                      </div>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator orientation="vertical" className="h-8" />

              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 bg-primary">
                  <AvatarFallback className="bg-primary text-white">
                    <Icon name="User" size={16} />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-primary">
                    {displayName}
                  </p>
                  <p className="text-xs text-muted-foreground">{roleDisplay}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Button - Positioned between header and sidebar */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSidebar}
            className={`hidden lg:flex fixed top-8 -translate-y-1/2 w-8 h-8 rounded-full transition-all duration-300 shadow-md hover:bg-primary hover:text-white hover:border-primary`}
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
