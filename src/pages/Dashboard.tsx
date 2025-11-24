import React from "react";
import { StatCard } from "../components/dashboard/StatCard";
import { RecentOrders } from "../components/dashboard/RecentOrders";
import { QuickStats } from "../components/dashboard/QuickStats";
import { statCards } from "../data/mockData";
import { Breadcrumb } from "../components/layout/BreadCrumb";

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb Component */}
      <div>
        <Breadcrumb currentPage="OVERVIEW" currentHref="#" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
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
