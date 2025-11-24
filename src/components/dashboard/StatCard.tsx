import React from 'react';
import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { StatCard as StatCardType } from '../../types';

interface StatCardProps {
  stat: StatCardType;
}

export const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-orange-50 text-orange-600',
    teal: 'bg-teal-50 text-teal-600'
  };

  return (
    <Card className="hover:scale-105">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
            <p className={`text-sm ${stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'}`}>
              {stat.change}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
            <Icon name={stat.icon as any} size={24} />
          </div>
        </div>
      </div>
    </Card>
  );
};