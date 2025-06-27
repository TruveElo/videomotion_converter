import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PortMonitoringTab = ({ settings, onSettingsChange, onTestConnection }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const handleInputChange = (field, value) => {
    onSettingsChange('portMonitoring', { ...settings, [field]: value });
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateField = (field, value) => {
    const errors = {};
    
    switch (field) {
      case 'portNumber':
        if (!value || value < 1 || value > 65535) {
          errors[field] = 'Port number must be between 1 and 65535';
        }
        break;
      case 'pollingInterval':
        if (!value || value < 1000) {
          errors[field] = 'Polling interval must be at least 1000ms';
        }
        break;
      case 'maxFileSize':
        if (!value || value < 1) {
          errors[field] = 'Maximum file size must be greater than 0';
        }
        break;
      default:
        break;
    }
    
    setValidationErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    try {
      await onTestConnection('port');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const supportedFormats = ['mp4', 'avi', 'mov', 'mkv', 'wmv', 'flv'];

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Wifi" size={20} className="mr-2 text-primary" />
          Port Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Port Number
            </label>
            <Input
              type="number"
              placeholder="8080"
              value={settings.portNumber || ''}
              onChange={(e) => handleInputChange('portNumber', parseInt(e.target.value))}
              onBlur={(e) => validateField('portNumber', parseInt(e.target.value))}
              className={validationErrors.portNumber ? 'border-error' : ''}
            />
            {validationErrors.portNumber && (
              <p className="text-error text-xs mt-1 flex items-center">
                <Icon name="AlertCircle" size={12} className="mr-1" />
                {validationErrors.portNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Polling Interval (ms)
            </label>
            <Input
              type="number"
              placeholder="5000"
              value={settings.pollingInterval || ''}
              onChange={(e) => handleInputChange('pollingInterval', parseInt(e.target.value))}
              onBlur={(e) => validateField('pollingInterval', parseInt(e.target.value))}
              className={validationErrors.pollingInterval ? 'border-error' : ''}
            />
            {validationErrors.pollingInterval && (
              <p className="text-error text-xs mt-1 flex items-center">
                <Icon name="AlertCircle" size={12} className="mr-1" />
                {validationErrors.pollingInterval}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              File Detection Pattern
            </label>
            <Input
              type="text"
              placeholder="*.mp4,*.avi,*.mov"
              value={settings.filePattern || ''}
              onChange={(e) => handleInputChange('filePattern', e.target.value)}
            />
            <p className="text-text-secondary text-xs mt-1">
              Use wildcards and comma-separated patterns
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Max File Size (MB)
            </label>
            <Input
              type="number"
              placeholder="500"
              value={settings.maxFileSize || ''}
              onChange={(e) => handleInputChange('maxFileSize', parseInt(e.target.value))}
              onBlur={(e) => validateField('maxFileSize', parseInt(e.target.value))}
              className={validationErrors.maxFileSize ? 'border-error' : ''}
            />
            {validationErrors.maxFileSize && (
              <p className="text-error text-xs mt-1 flex items-center">
                <Icon name="AlertCircle" size={12} className="mr-1" />
                {validationErrors.maxFileSize}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="outline"
            onClick={handleTestConnection}
            loading={isTestingConnection}
            iconName="Zap"
            iconPosition="left"
          >
            Test Port Connection
          </Button>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4 flex items-center">
          <Icon name="FileVideo" size={20} className="mr-2 text-primary" />
          Supported Formats
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {supportedFormats.map((format) => (
            <div
              key={format}
              className="flex items-center justify-center p-3 bg-background rounded-lg border border-border"
            >
              <span className="text-sm font-medium text-text-primary uppercase">
                {format}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-accent/5 rounded-lg border border-accent/20">
          <div className="flex items-start">
            <Icon name="Info" size={16} className="text-accent mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-text-primary font-medium">Format Detection</p>
              <p className="text-xs text-text-secondary mt-1">
                Files are automatically validated against supported formats. Unsupported files will be skipped with appropriate logging.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortMonitoringTab;