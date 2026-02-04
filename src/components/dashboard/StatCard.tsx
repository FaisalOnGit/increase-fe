import React from "react";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/Icon";
import { StatCard as StatCardType } from "../../types";
import { cn } from "@/lib/utils";

interface StatCardProps {
  stat: StatCardType;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, className }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-600",
    teal: "bg-teal-50 text-teal-600",
  };

  return (
    <Card className={cn("hover:scale-105 transition-transform", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">{stat.title}</p>
            <p className="text-2xl font-bold mb-2">{stat.value}</p>
            <p
              className={cn(
                "text-sm",
                stat.changeType === "positive"
                  ? "text-emerald-600"
                  : "text-red-600"
              )}
            >
              {stat.change}
            </p>
          </div>
          <div
            className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              colorClasses[stat.color as keyof typeof colorClasses]
            )}
          >
            <Icon name={stat.icon as any} size={24} />
          </div>
        </div>
      </div>
    </Card>
  );
};
