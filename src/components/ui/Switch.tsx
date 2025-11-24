import React from "react";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  size = "md",
  disabled = false,
  className = "",
  id,
}) => {
  const baseClasses =
    "relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2";

  const sizeClasses = {
    sm: "h-5 w-9",
    md: "h-6 w-11",
    lg: "h-7 w-14",
  };

  const toggleSizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const translateClasses = {
    sm: checked ? "translate-x-4" : "translate-x-0",
    md: checked ? "translate-x-5" : "translate-x-0",
    lg: checked ? "translate-x-7" : "translate-x-0",
  };

  const bgClasses = checked ? "bg-indigo-600" : "bg-gray-200";
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      type="button"
      id={id}
      className={`${baseClasses} ${sizeClasses[size]} ${bgClasses} ${disabledClasses} ${className}`}
      onClick={() => !disabled && onChange && onChange(!checked)}
      disabled={disabled}
    >
      <span
        className={`${toggleSizeClasses[size]} ${translateClasses[size]} inline-block rounded-full bg-white shadow transform transition-transform duration-200`}
      />
    </button>
  );
};
