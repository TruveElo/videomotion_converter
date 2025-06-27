import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PortMonitoringTab from './components/PortMonitoringTab';
import ConversionSettingsTab from './components/ConversionSettingsTab';
import AwsIntegrationTab from './components/AwsIntegrationTab';
import SystemPreferencesTab from './components/SystemPreferencesTab';
import ChangeHistoryPanel from './components/ChangeHistoryPanel';

const SystemSettingsConfiguration = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('port-monitoring');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showChangeHistory, setShowChangeHistory] = useState(false);

  const [settings, setSettings] = useState({
    portMonitoring: {
      portNumber: 8080,
      pollingInterval: 5000,
      filePattern: "*.mp4,*.avi,*.mov",
      maxFileSize: 500
    },
    conversionSettings: {
      frameRate: 12,
      quality: 'high',
      batchSize: 5,
      priority: 'normal',
      resolution: '1080p',
      compression: 5
    },
    awsIntegration: {
      bucketName: 'video-processing-bucket',
      region: 'us-east-1',
      pathPrefix: 'processed-videos/',
      accessKeyId: 'AKIA...',
      secretAccessKey: '***hidden***',
      maxRetries: 3,
      retryDelay: 30,
      timeout: 300
    },
    systemPreferences: {
      notifyProcessingComplete: true,
      notifyProcessingErrors: true,
      notifyUploadStatus: true,
      notifySystemStatus: false,
      logLevel: 'info',
      logRetention: 30,
      maxLogSize: 100,
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      theme: 'light',
      compactMode: false,
      animations: true
    }
  });

  const tabs = [
    {
      id: 'port-monitoring',
      label: 'Port Monitoring',
      icon: 'Wifi',
      description: 'Configure port polling and file detection'
    },
    {
      id: 'conversion-settings',
      label: 'Conversion Settings',
      icon: 'Settings',
      description: 'Stop motion parameters and quality presets'
    },
    {
      id: 'aws-integration',
      label: 'AWS Integration',
      icon: 'Cloud',
      description: 'S3 endpoints and authentication'
    },
    {
      id: 'system-preferences',
      label: 'System Preferences',
      icon: 'Sliders',
      description: 'Notifications, logging, and UI customization'
    }
  ];

  useEffect(() => {
    // Simulate loading saved settings
    const savedSettings = localStorage.getItem('videoMotionSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
        setLastSaved(new Date(localStorage.getItem('videoMotionLastSaved') || Date.now()));
      } catch (error) {
        console.error('Failed to load saved settings:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Detect unsaved changes
    const originalSettings = localStorage.getItem('videoMotionSettings');
    const currentSettings = JSON.stringify(settings);
    setHasUnsavedChanges(originalSettings !== currentSettings);
  }, [settings]);

  const handleSettingsChange = (section, newSettings) => {
    setSettings(prev => ({
      ...prev,
      [section]: newSettings
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.setItem('videoMotionSettings', JSON.stringify(settings));
      localStorage.setItem('videoMotionLastSaved', new Date().toISOString());
      
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values? This action cannot be undone.')) {
      const defaultSettings = {
        portMonitoring: {
          portNumber: 8080,
          pollingInterval: 5000,
          filePattern: "*.mp4,*.avi,*.mov",
          maxFileSize: 500
        },
        conversionSettings: {
          frameRate: 12,
          quality: 'medium',
          batchSize: 3,
          priority: 'normal',
          resolution: '1080p',
          compression: 5
        },
        awsIntegration: {
          bucketName: '',
          region: 'us-east-1',
          pathPrefix: '',
          accessKeyId: '',
          secretAccessKey: '',
          maxRetries: 3,
          retryDelay: 30,
          timeout: 300
        },
        systemPreferences: {
          notifyProcessingComplete: true,
          notifyProcessingErrors: true,
          notifyUploadStatus: false,
          notifySystemStatus: false,
          logLevel: 'info',
          logRetention: 30,
          maxLogSize: 100,
          timezone: 'UTC',
          dateFormat: 'MM/DD/YYYY',
          theme: 'light',
          compactMode: false,
          animations: true
        }
      };
      setSettings(defaultSettings);
    }
  };

  const handleTestConnection = async (type) => {
    // Simulate connection testing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (type === 'port') {
      return { success: Math.random() > 0.3 };
    } else if (type === 'aws') {
      return { success: Math.random() > 0.2 };
    }
    
    return { success: false };
  };

  const handleRollback = (changeId) => {
    console.log('Rolling back change:', changeId);
    // Implement rollback logic here
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'port-monitoring':
        return (
          <PortMonitoringTab
            settings={settings.portMonitoring}
            onSettingsChange={handleSettingsChange}
            onTestConnection={handleTestConnection}
          />
        );
      case 'conversion-settings':
        return (
          <ConversionSettingsTab
            settings={settings.conversionSettings}
            onSettingsChange={handleSettingsChange}
          />
        );
      case 'aws-integration':
        return (
          <AwsIntegrationTab
            settings={settings.awsIntegration}
            onSettingsChange={handleSettingsChange}
            onTestConnection={handleTestConnection}
          />
        );
      case 'system-preferences':
        return (
          <SystemPreferencesTab
            settings={settings.systemPreferences}
            onSettingsChange={handleSettingsChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-heading-bold text-text-primary">
                System Settings & Configuration
              </h1>
              <p className="text-text-secondary mt-2">
                Configure automated video processing parameters and system behavior
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowChangeHistory(!showChangeHistory)}
                iconName="History"
                iconPosition="left"
              >
                Change History
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/file-upload-processing')}
                iconName="Upload"
                iconPosition="left"
              >
                Go to Processing
              </Button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={hasUnsavedChanges ? 'AlertCircle' : 'CheckCircle'} 
                  size={16} 
                  className={hasUnsavedChanges ? 'text-warning' : 'text-success'}
                />
                <span className="text-sm font-medium text-text-primary">
                  {hasUnsavedChanges ? 'Unsaved Changes' : 'All Changes Saved'}
                </span>
              </div>
              
              {lastSaved && (
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    Last saved: {lastSaved.toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={handleResetSettings}
                iconName="RotateCcw"
                iconPosition="left"
                size="sm"
              >
                Reset to Defaults
              </Button>
              
              <Button
                variant="primary"
                onClick={handleSaveSettings}
                loading={isSaving}
                disabled={!hasUnsavedChanges}
                iconName="Save"
                iconPosition="left"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-lg border border-border p-6 sticky top-24">
              <h3 className="text-lg font-heading-semibold text-text-primary mb-4">
                Configuration Sections
              </h3>
              
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-secondary hover:text-text-primary hover:bg-background'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={tab.icon} 
                        size={18} 
                        className={activeTab === tab.id ? 'text-primary-foreground' : 'text-text-secondary'}
                      />
                      <div>
                        <div className="font-medium">{tab.label}</div>
                        <div className={`text-xs ${
                          activeTab === tab.id ? 'text-primary-foreground/80' : 'text-text-secondary'
                        }`}>
                          {tab.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {/* Tab Content */}
              <div className="bg-surface rounded-lg border border-border">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={tabs.find(tab => tab.id === activeTab)?.icon || 'Settings'} 
                      size={24} 
                      className="text-primary"
                    />
                    <div>
                      <h2 className="text-xl font-heading-semibold text-text-primary">
                        {tabs.find(tab => tab.id === activeTab)?.label}
                      </h2>
                      <p className="text-text-secondary">
                        {tabs.find(tab => tab.id === activeTab)?.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>

              {/* Change History Panel */}
              {showChangeHistory && (
                <ChangeHistoryPanel onRollback={handleRollback} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsConfiguration;