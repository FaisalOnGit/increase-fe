import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
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
      case 'ditolak':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'proses':
        return 'Sedang Dinilai';
      case 'selesai':
        return 'Disetujui';
      case 'baru':
        return 'Pengajuan Baru';
      case 'ditolak':
        return 'Ditolak';
      default:
        return status;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Proposal Terbaru</h3>
          <Button variant="ghost" size="sm">
            Lihat Semua
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0 py-0">
        <div className="space-y-0">
          {recentOrders.map((order, index) => (
            <div key={order.id} className={`px-6 py-4 hover:bg-gray-50 transition-colors ${index !== recentOrders.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="FileText" size={16} className="text-gray-400" />
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{order.service}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{formatDate("2024-01-15")}</span>
                    <span>•</span>
                    <span>NILAI: {order.price}/100</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};