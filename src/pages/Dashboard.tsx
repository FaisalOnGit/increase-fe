import React, { useState, useEffect } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { statCards } from "@/data/mockData";
import { Breadcrumb } from "@/components/layout/BreadCrumb";

export const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("Administrator");

  useEffect(() => {
    const firstName = sessionStorage.getItem("firstName");
    const role = sessionStorage.getItem("role") || "Administrator";

    if (firstName) {
      setUserName(firstName);
    }
    setUserRole(role);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Card Component */}
      <WelcomeCard userName={userName} userRole={userRole} />

      {/* Breadcrumb Component */}
      <div>
        <Breadcrumb
          pages={[
            { name: "Dashboard", href: "/dashboard" },
          ]}
        />
      </div>

      {/* Stats Grid - Statistik Ajuan */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Statistik Ajuan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentOrders />
        </div>
        <div>
          <QuickStats />
        </div>
      </div>
    </div>
  );
};
