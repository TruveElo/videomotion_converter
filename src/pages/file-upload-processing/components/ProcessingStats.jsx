import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Processed',
      value: stats.totalProcessed,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: 'Loader',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Failed',
      value: stats.failed,
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      label: 'Queue Size',
      value: stats.queueSize,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div key={index} className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center`}>
              <Icon 
                name={item.icon} 
                size={20} 
                className={`${item.color} ${item.icon === 'Loader' && item.value > 0 ? 'animate-spin' : ''}`} 
              />
            </div>
            <div>
              <div className="text-2xl font-heading-bold text-text-primary">
                {item.value}
              </div>
              <div className="text-xs text-text-secondary">
                {item.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessingStats;