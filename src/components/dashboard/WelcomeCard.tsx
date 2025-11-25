import React from "react";
import { Icon } from "../ui/Icon";

interface WelcomeCardProps {
  userName?: string;
  userRole?: string;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({
  userName = "User",
  userRole = "Administrator"
}) => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Selamat Datang, {userName}!
          </h1>
          <p className="text-white/90 text-lg">
            Anda telah login sebagai <span className="font-semibold">{userRole}</span>
          </p>
        </div>
        <div className="bg-white/20 p-4 rounded-full">
          <Icon name="User" size={48} className="text-white" />
        </div>
      </div>
    </div>
  );
};