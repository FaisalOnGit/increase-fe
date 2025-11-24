import React from "react";

interface StatusBadgeProps {
  status: "active" | "inactive";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  const statusClasses =
    status === "active"
      ? "bg-green-100 text-green-800 border border-green-200"
      : "bg-red-100 text-red-800 border border-red-200";

  return (
    <span className={`${baseClasses} ${statusClasses}`}>
      <div
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          status === "active" ? "bg-green-500" : "bg-red-500"
        }`}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
