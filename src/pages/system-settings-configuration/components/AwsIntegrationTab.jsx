import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AwsIntegrationTab = ({ settings, onSettingsChange, onTestConnection }) => {
  const [showCredentials, setShowCredentials] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const handleInputChange = (field, value) => {
    onSettingsChange('awsIntegration', { ...settings, [field]: value });
  };

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus('testing');
    
    try {
      const result = await onTestConnection('aws');
      setConnectionStatus(result.success ? 'success' : 'error');
    } catch (error) {
      setConnectionStatus('error');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'testing':
        return 'Loader';
      case 'success':
        return 'CheckCircle';
      case 'error':
        return 'XCircle';
      default:
        return 'Zap';
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'testing':
        return 'text-warning';
      case 'success':
        return 'text-success';
      case 'error':
        return 'text-error';
      default:
        return 'text-primary';
    }
  };

  const regions = [
    { value: 'us-east-1', label: 'US East (N. Virginia)' },
    { value: 'us-west-2', label: 'US West (Oregon)' },
    { value: 'eu-west-1', label: 'Europe (Ireland)' },
    { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
    { value: 'ap-northeast-1', label: 'Asia Pacific (Tokyo)' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Cloud" size={20} className="mr-2 text-primary" />
          AWS Endpoint Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-2">
              S3 Bucket Name
            </label>
            <Input
              type="text"
              placeholder="my-video-processing-bucket"
              value={settings.bucketName || ''}
              onChange={(e) => handleInputChange('bucketName', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              AWS Region
            </label>
            <select
              value={settings.region || 'us-east-1'}
              onChange={(e) => handleInputChange('region', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {regions.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Upload Path Prefix
            </label>
            <Input
              type="text"
              placeholder="processed-videos/"
              value={settings.pathPrefix || ''}
              onChange={(e) => handleInputChange('pathPrefix', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading-semibold text-text-primary flex items-center">
            <Icon name="Key" size={20} className="mr-2 text-primary" />
            Authentication Credentials
          </h3>
          <Button
            variant="ghost"
            onClick={() => setShowCredentials(!showCredentials)}
            iconName={showCredentials ? 'EyeOff' : 'Eye'}
            iconPosition="left"
          >
            {showCredentials ? 'Hide' : 'Show'} Credentials
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Access Key ID
            </label>
            <Input
              type={showCredentials ? 'text' : 'password'}
              placeholder="AKIA..."
              value={settings.accessKeyId || ''}
              onChange={(e) => handleInputChange('accessKeyId', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Secret Access Key
            </label>
            <Input
              type={showCredentials ? 'text' : 'password'}
              placeholder="Enter secret access key"
              value={settings.secretAccessKey || ''}
              onChange={(e) => handleInputChange('secretAccessKey', e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 p-4 bg-warning/5 rounded-lg border border-warning/20">
          <div className="flex items-start">
            <Icon name="Shield" size={16} className="text-warning mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-text-primary font-medium">Security Notice</p>
              <p className="text-xs text-text-secondary mt-1">
                Credentials are encrypted and stored securely. Use IAM roles with minimal required permissions for enhanced security.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4 flex items-center">
          <Icon name="RefreshCw" size={20} className="mr-2 text-primary" />
          Upload & Retry Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Max Retry Attempts
            </label>
            <Input
              type="number"
              placeholder="3"
              value={settings.maxRetries || ''}
              onChange={(e) => handleInputChange('maxRetries', parseInt(e.target.value))}
              min="1"
              max="10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Retry Delay (seconds)
            </label>
            <Input
              type="number"
              placeholder="30"
              value={settings.retryDelay || ''}
              onChange={(e) => handleInputChange('retryDelay', parseInt(e.target.value))}
              min="1"
              max="300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Timeout (seconds)
            </label>
            <Input
              type="number"
              placeholder="300"
              value={settings.timeout || ''}
              onChange={(e) => handleInputChange('timeout', parseInt(e.target.value))}
              min="30"
              max="3600"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={handleTestConnection}
              loading={isTestingConnection}
              iconName={getConnectionStatusIcon()}
              iconPosition="left"
              className={getConnectionStatusColor()}
            >
              Test AWS Connection
            </Button>
            
            {connectionStatus && (
              <div className={`flex items-center space-x-2 ${getConnectionStatusColor()}`}>
                <Icon 
                  name={getConnectionStatusIcon()} 
                  size={16} 
                  className={connectionStatus === 'testing' ? 'animate-spin' : ''}
                />
                <span className="text-sm font-medium">
                  {connectionStatus === 'testing' && 'Testing connection...'}
                  {connectionStatus === 'success' && 'Connection successful'}
                  {connectionStatus === 'error' && 'Connection failed'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Activity" size={20} className="mr-2 text-primary" />
          Connection Status
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Last Test</span>
              <Icon name="Clock" size={14} className="text-text-secondary" />
            </div>
            <div className="text-lg font-bold text-text-primary">
              {new Date().toLocaleTimeString()}
            </div>
          </div>

          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Status</span>
              <Icon name="Wifi" size={14} className="text-success" />
            </div>
            <div className="text-lg font-bold text-success">Connected</div>
          </div>

          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Latency</span>
              <Icon name="Zap" size={14} className="text-text-secondary" />
            </div>
            <div className="text-lg font-bold text-text-primary">45ms</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwsIntegrationTab;