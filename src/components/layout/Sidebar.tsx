import React, { useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@/components/ui/Icon";
import { navItems } from "@/data/mockData";
import miniLogo from "/simanislite.png";
import { useAuth } from "@/contexts/AuthContext";
import { filterMenuByRole } from "@/utils/menuFilter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { userRole, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Filter menu based on user role
  const filteredNavItems = useMemo(() => {
    console.log("Current userRole:", userRole);
    const filtered = filterMenuByRole(navItems, userRole || undefined);
    console.log("Filtered menu:", filtered);
    return filtered;
  }, [userRole]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const isItemActive = (path?: string): boolean => {
    if (!path) return false;
    return location.pathname === path;
  };

  const hasActiveChild = (children?: { path?: string }[]): boolean => {
    if (!children) return false;
    return children.some((child) => isItemActive(child.path));
  };

  const renderMenuItem = (item: {
    id: string;
    label: string;
    icon: string;
    path?: string;
    children?: { id: string; label: string; icon: string; path?: string }[];
  }, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = isItemActive(item.path) || hasActiveChild(item.children);

    const menuItemContent = (
      <>
        <div className="flex items-center gap-3">
          <Icon
            name={item.icon as never}
            size={20}
            className={cn(isActive ? "text-white" : "text-muted-foreground")}
          />
          {!isCollapsed && <span className="font-medium">{item.label}</span>}
        </div>
        {!isCollapsed && hasChildren && (
          <Icon
            name="ChevronDown"
            size={14}
            className={cn(
              "transition-transform text-muted-foreground",
              isExpanded && "rotate-180",
            )}
          />
        )}
      </>
    );

    return (
      <div key={item.id}>
        {hasChildren ? (
          <div
            className={cn(
              "flex items-center justify-between px-3 py-2 rounded-lg mb-1 transition-colors group cursor-pointer",
              isActive
                ? "bg-secondary text-white"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
            style={{ paddingLeft: `${level * 12 + 12}px` }}
            onClick={() => toggleExpanded(item.id)}
          >
            {menuItemContent}
          </div>
        ) : (
          <Link
            to={item.path}
            className={cn(
              "flex items-center justify-between px-3 py-2 rounded-lg mb-1 transition-colors group cursor-pointer",
              isActive
                ? "bg-secondary text-white"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
            style={{ paddingLeft: `${level * 12 + 12}px` }}
            onClick={() => window.innerWidth < 1024 && onToggle()}
          >
            {menuItemContent}
          </Link>
        )}
        {hasChildren && !isCollapsed && isExpanded && (
          <div className="mt-1">
            {item.children.map((child) => (
              <Link
                key={child.id}
                to={child.path || "/"}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors group",
                  isItemActive(child.path)
                    ? "bg-secondary text-white"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
                style={{ paddingLeft: `${level * 12 + 36}px` }}
                onClick={() => window.innerWidth < 1024 && onToggle()}
              >
                <Icon
                  name={child.icon as never}
                  size={18}
                  className={cn(
                    isItemActive(child.path)
                      ? "text-white"
                      : "text-muted-foreground",
                  )}
                />
                <span className="font-medium text-sm">{child.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div
        className={cn(
          "fixed left-0 top-0 h-full bg-background border-r border-border shadow-lg z-50 transition-all duration-300 ease-in-out flex flex-col",
          isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "w-64",
        )}
        style={{ zIndex: 60 }}
      >
        <div className="flex items-center justify-between p-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <img src={miniLogo} alt="Logo" className="w-10 h-auto" />
            {!isCollapsed && (
              <span className="font-bold text-xl text-primary">INCREASE</span>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="lg:hidden"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <nav className="mt-6 px-2 flex-1 overflow-y-auto scrollbar-hide">
          {filteredNavItems.map((item) => renderMenuItem(item))}
        </nav>

        <div className="px-2 pb-4 flex-shrink-0">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive hover:text-destructive-foreground justify-start w-full text-muted-foreground"
          >
            <Icon name="LogOut" size={18} />
            {!isCollapsed && (
              <span className="font-medium text-sm">Keluar</span>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};
