import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { quickStats } from "../../data/mockData";

export const QuickStats: React.FC = () => {
  const colorClasses = {
    blue: "text-blue-600",
    emerald: "text-emerald-600",
    yellow: "text-yellow-500",
    purple: "text-purple-600",
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Statistik Cepat</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-3">
                <Icon
                  name={stat.icon as never}
                  size={18}
                  className={
                    colorClasses[stat.color as keyof typeof colorClasses]
                  }
                />
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
              <span className="font-semibold">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
