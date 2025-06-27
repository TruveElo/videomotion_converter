import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChangeHistoryPanel = ({ onRollback }) => {
  const [selectedChange, setSelectedChange] = useState(null);

  const changeHistory = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 300000),
      user: "System Admin",
      section: "Port Monitoring",
      changes: [
        { field: "Port Number", oldValue: "8080", newValue: "8081" },
        { field: "Polling Interval", oldValue: "5000ms", newValue: "3000ms" }
      ],
      status: "applied"
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 900000),
      user: "John Smith",
      section: "AWS Integration",
      changes: [
        { field: "S3 Bucket", oldValue: "old-bucket", newValue: "new-video-bucket" },
        { field: "Region", oldValue: "us-east-1", newValue: "us-west-2" }
      ],
      status: "applied"
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 1800000),
      user: "Sarah Johnson",
      section: "Conversion Settings",
      changes: [
        { field: "Frame Rate", oldValue: "24", newValue: "12" },
        { field: "Quality", oldValue: "medium", newValue: "high" }
      ],
      status: "applied"
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 3600000),
      user: "Mike Wilson",
      section: "System Preferences",
      changes: [
        { field: "Log Level", oldValue: "info", newValue: "debug" },
        { field: "Timezone", oldValue: "UTC", newValue: "America/New_York" }
      ],
      status: "rolled_back"
    }
  ];

  const handleRollback = (changeId) => {
    onRollback(changeId);
    setSelectedChange(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'applied':
        return 'CheckCircle';
      case 'rolled_back':
        return 'RotateCcw';
      default:
        return 'Clock';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied':
        return 'text-success';
      case 'rolled_back':
        return 'text-warning';
      default:
        return 'text-text-secondary';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading-semibold text-text-primary flex items-center">
          <Icon name="History" size={20} className="mr-2 text-primary" />
          Change History
        </h3>
        <Button
          variant="outline"
          iconName="RefreshCw"
          iconPosition="left"
        >
          Refresh
        </Button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {changeHistory.map((change) => (
          <div
            key={change.id}
            className={`p-4 rounded-lg border transition-all cursor-pointer ${
              selectedChange === change.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedChange(selectedChange === change.id ? null : change.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Icon 
                    name={getStatusIcon(change.status)} 
                    size={16} 
                    className={getStatusColor(change.status)}
                  />
                  <h4 className="font-medium text-text-primary">{change.section}</h4>
                  <span className="text-xs text-text-secondary bg-background px-2 py-1 rounded">
                    {change.user}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary mb-2">
                  {formatTimestamp(change.timestamp)}
                </p>

                <div className="text-sm text-text-primary">
                  {change.changes.length} change{change.changes.length !== 1 ? 's' : ''} made
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {change.status === 'applied' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRollback(change.id);
                    }}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Rollback
                  </Button>
                )}
                <Icon 
                  name={selectedChange === change.id ? 'ChevronUp' : 'ChevronDown'} 
                  size={16} 
                  className="text-text-secondary"
                />
              </div>
            </div>

            {selectedChange === change.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <h5 className="font-medium text-text-primary mb-3">Change Details:</h5>
                <div className="space-y-2">
                  {change.changes.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="font-medium text-text-primary">{item.field}:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-error bg-error/10 px-2 py-1 rounded text-xs">
                          {item.oldValue}
                        </span>
                        <Icon name="ArrowRight" size={12} className="text-text-secondary" />
                        <span className="text-success bg-success/10 px-2 py-1 rounded text-xs">
                          {item.newValue}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {changeHistory.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Clock" size={48} className="text-text-secondary mx-auto mb-4" />
          <h4 className="text-lg font-medium text-text-primary mb-2">No Changes Yet</h4>
          <p className="text-text-secondary">
            Configuration changes will appear here once you start modifying settings.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChangeHistoryPanel;