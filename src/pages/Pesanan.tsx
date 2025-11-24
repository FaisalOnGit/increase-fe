import React from "react";
import LineChart from "../components/dashboard/LineChart";
import BarChart from "../components/dashboard/BarChart";
import { Breadcrumb } from "../components/layout/BreadCrumb";

export const Pesanan: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <Breadcrumb currentPage="PESANAN" currentHref="/" />
      <div className="grid grid-cols-2 space-x-6">
        <LineChart />
        <BarChart />
      </div>
    </div>
  );
};
