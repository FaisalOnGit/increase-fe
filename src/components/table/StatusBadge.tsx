import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "inactive";
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const isActive = status === "active";

  return (
    <Badge
      variant={isActive ? "default" : "destructive"}
      className={cn("gap-1.5", className)}
    >
      <div
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          isActive ? "bg-white" : "bg-white"
        )}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};
