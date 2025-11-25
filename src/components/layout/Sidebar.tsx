import React, { useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { navItems } from "../../data/mockData";
import miniLogo from "/simanislite.png";
import logo from "/simanis.png";
import { useAuth } from "../../contexts/AuthContext";
import { filterMenuByRole } from "../../utils/menuFilter";

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
  }, [navItems, userRole]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
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

  const renderMenuItem = (item: any, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = isItemActive(item.path) || hasActiveChild(item.children);

    return (
      <div key={item.id}>
        <div
          className={`flex items-center justify-between px-3 py-3 rounded-lg mb-1 transition-colors group cursor-pointer ${
            isActive
              ? "bg-secondary text-white"
              : "text-white hover:bg-secondary hover:text-white"
          }`}
          style={{ paddingLeft: `${level * 12 + 12}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else if (item.path) {
              window.innerWidth < 1024 && onToggle();
            }
          }}
        >
          <div className="flex items-center space-x-3">
            <Icon
              name={item.icon as any}
              size={20}
              className={
                isActive ? "text-white" : "text-white group-hover:text-white"
              }
            />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </div>
          {!isCollapsed && hasChildren && (
            <Icon
              name="ChevronDown"
              size={16}
              className={`transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
        {hasChildren && !isCollapsed && isExpanded && (
          <div className="mt-1">
            {item.children.map((child: any) => (
              <Link
                key={child.id}
                to={child.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors group ${
                  isItemActive(child.path)
                    ? "bg-secondary text-primary"
                    : "text-white hover:bg-secondary hover:text-white"
                }`}
                style={{ paddingLeft: `${level * 12 + 36}px` }}
                onClick={() => window.innerWidth < 1024 && onToggle()}
              >
                <Icon
                  name={child.icon as any}
                  size={18}
                  className={
                    isItemActive(child.path)
                      ? "text-primary"
                      : "text-white group-hover:text-white"
                  }
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full bg-primary text-white z-50 transition-all duration-300 ease-in-out flex flex-col ${
          isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "w-64"
        }`}
        style={{ zIndex: 60 }}
      >
        <div className="flex items-center justify-between p-4 flex-shrink-0">
          <img
            src={isCollapsed ? miniLogo : logo}
            alt="Logo"
            className={isCollapsed ? "w-12 h-auto" : "w-48 h-auto"}
          />

          <button
            onClick={onToggle}
            className="p-1 rounded-lg hover:bg-indigo-800 transition-colors lg:hidden"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <nav className="mt-6 px-2 flex-1 overflow-y-auto scrollbar-hide">
          {filteredNavItems.map((item) => renderMenuItem(item))}
        </nav>

        <div className="px-2 pb-4 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors group text-white hover:bg-red-600 hover:text-white w-full"
          >
            <Icon
              name="LogOut"
              size={20}
              className="text-white group-hover:text-white"
            />
            {!isCollapsed && <span className="font-medium">Keluar</span>}
          </button>
        </div>
      </div>
    </>
  );
};
