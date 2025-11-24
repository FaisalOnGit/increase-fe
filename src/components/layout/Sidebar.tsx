import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { navItems } from "../../data/mockData";
import miniLogo from "/logo.png";
import logo from "/obsesiman.png";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

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
                onClick={() => window.innerWidth < 1024 && onToggle()}
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
                {!isCollapsed && (
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
            {!isCollapsed && <span className="font-medium">Keluar</span>}
          </button>
        </div>
      </div>
    </>
  );
};
