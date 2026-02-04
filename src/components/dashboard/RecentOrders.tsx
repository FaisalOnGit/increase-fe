import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/Icon";
import { Separator } from "@/components/ui/separator";
import { recentOrders } from "../../data/mockData";

export const RecentOrders: React.FC = () => {
  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "proses":
        return "outline";
      case "selesai":
        return "default";
      case "baru":
        return "secondary";
      case "ditolak":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "proses":
        return "Sedang Dinilai";
      case "selesai":
        return "Disetujui";
      case "baru":
        return "Pengajuan Baru";
      case "ditolak":
        return "Ditolak";
      default:
        return status;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Proposal Terbaru</h3>
          <Button variant="ghost" size="sm">
            Lihat Semua
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0 py-0">
        <div className="space-y-0">
          {recentOrders.map((order, index) => (
            <div key={order.id}>
              <div className="flex items-start justify-between px-6 py-4 hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="FileText" size={16} className="text-muted-foreground" />
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {order.service}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{formatDate("2024-01-15")}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span>NILAI: {order.price}/100</span>
                  </div>
                </div>
                <Badge variant={getStatusVariant(order.status)}>
                  {getStatusText(order.status)}
                </Badge>
              </div>
              {index !== recentOrders.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
