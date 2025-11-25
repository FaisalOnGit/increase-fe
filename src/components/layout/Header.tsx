import React from "react";
import { Icon } from "../ui/Icon";

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  sidebarCollapsed,
}) => {
  const firstName = localStorage.getItem("firstName");

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </button>

          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Icon
              name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"}
              size={20}
            />
          </button>

          <div>
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
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
              {/* Display the firstName dynamically from localStorage */}
              <p className="text-sm font-medium text-primary">{firstName}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
