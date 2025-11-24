import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { recentOrders } from '../../data/mockData';

export const RecentOrders: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'proses':
        return 'bg-blue-100 text-blue-800';
      case 'selesai':
        return 'bg-emerald-100 text-emerald-800';
      case 'baru':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'proses':
        return 'Proses';
      case 'selesai':
        return 'Selesai';
      case 'baru':
        return 'Baru';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Pesanan Terbaru</h3>
          <Button variant="ghost" size="sm">
            Lihat Semua
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0 py-0">
        <div className="space-y-0">
          {recentOrders.map((order, index) => (
            <div key={order.id} className={`px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${index !== recentOrders.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  order.status === 'proses' ? 'bg-blue-100' : 
                  order.status === 'selesai' ? 'bg-emerald-100' : 'bg-orange-100'
                }`}>
                  <span className={`text-sm font-semibold ${
                    order.status === 'proses' ? 'text-blue-600' : 
                    order.status === 'selesai' ? 'text-emerald-600' : 'text-orange-600'
                  }`}>
                    {order.customerName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.customerName}</p>
                  <p className="text-sm text-gray-500">{order.weight} kg • Rp {order.price.toLocaleString()}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};