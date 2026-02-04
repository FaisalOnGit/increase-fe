import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/card";

interface WelcomeCardProps {
  userName?: string;
  userRole?: string;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({
  userName = "User",
  userRole = "Administrator",
}) => {
  return (
    <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Selamat Datang, {userName}!
            </h1>
            <p className="text-white/90 text-lg">
              Anda telah login sebagai{" "}
              <span className="font-semibold">{userRole}</span>
            </p>
          </div>
          <div className="bg-white/20 p-4 rounded-full">
            <Icon name="User" size={48} className="text-white" />
          </div>
        </div>
      </div>
    </Card>
  );
};
