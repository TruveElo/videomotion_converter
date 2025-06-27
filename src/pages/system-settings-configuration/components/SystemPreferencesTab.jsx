import React from 'react';
import Input from '../../../components/ui/Input';

import Icon from '../../../components/AppIcon';

const SystemPreferencesTab = ({ settings, onSettingsChange }) => {
  const handleInputChange = (field, value) => {
    onSettingsChange('systemPreferences', { ...settings, [field]: value });
  };

  const handleToggle = (field) => {
    onSettingsChange('systemPreferences', { ...settings, [field]: !settings[field] });
  };

  const timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' }
  ];

  const logLevels = [
    { value: 'error', label: 'Error Only', description: 'Log only critical errors' },
    { value: 'warn', label: 'Warning & Error', description: 'Log warnings and errors' },
    { value: 'info', label: 'Info, Warning & Error', description: 'Standard logging level' },
    { value: 'debug', label: 'Debug (Verbose)', description: 'Detailed logging for troubleshooting' }
  ];

  const themes = [
    { value: 'light', label: 'Light Theme', icon: 'Sun' },
    { value: 'dark', label: 'Dark Theme', icon: 'Moon' },
    { value: 'auto', label: 'Auto (System)', icon: 'Monitor' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Bell" size={20} className="mr-2 text-primary" />
          Notification Settings
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <div>
                <h4 className="font-medium text-text-primary">Processing Complete</h4>
                <p className="text-sm text-text-secondary">Notify when video conversion is finished</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('notifyProcessingComplete')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifyProcessingComplete ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifyProcessingComplete ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
              <div>
                <h4 className="font-medium text-text-primary">Processing Errors</h4>
                <p className="text-sm text-text-secondary">Notify when processing fails or encounters errors</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('notifyProcessingErrors')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifyProcessingErrors ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifyProcessingErrors ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <Icon name="Upload" size={20} className="text-accent" />
              <div>
                <h4 className="font-medium text-text-primary">Upload Status</h4>
                <p className="text-sm text-text-secondary">Notify about AWS upload success or failure</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('notifyUploadStatus')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifyUploadStatus ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifyUploadStatus ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <Icon name="Wifi" size={20} className="text-secondary" />
              <div>
                <h4 className="font-medium text-text-primary">System Status</h4>
                <p className="text-sm text-text-secondary">Notify about system connectivity and health</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('notifySystemStatus')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifySystemStatus ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifySystemStatus ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4 flex items-center">
          <Icon name="FileText" size={20} className="mr-2 text-primary" />
          Logging Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Log Level
            </label>
            <div className="space-y-2">
              {logLevels.map((level) => (
                <div
                  key={level.value}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    settings.logLevel === level.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleInputChange('logLevel', level.value)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-text-primary">{level.label}</h4>
                      <p className="text-xs text-text-secondary">{level.description}</p>
                    </div>
                    {settings.logLevel === level.value && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Log Retention (days)
            </label>
            <Input
              type="number"
              placeholder="30"
              value={settings.logRetention || ''}
              onChange={(e) => handleInputChange('logRetention', parseInt(e.target.value))}
              min="1"
              max="365"
            />
            <p className="text-text-secondary text-xs mt-1">
              Logs older than this will be automatically deleted
            </p>

            <div className="mt-4">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Max Log File Size (MB)
              </label>
              <Input
                type="number"
                placeholder="100"
                value={settings.maxLogSize || ''}
                onChange={(e) => handleInputChange('maxLogSize', parseInt(e.target.value))}
                min="1"
                max="1000"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Globe" size={20} className="mr-2 text-primary" />
          Regional Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Timezone
            </label>
            <select
              value={settings.timezone || 'UTC'}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Date Format
            </label>
            <select
              value={settings.dateFormat || 'MM/DD/YYYY'}
              onChange={(e) => handleInputChange('dateFormat', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY (EU)</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
              <option value="DD-MMM-YYYY">DD-MMM-YYYY</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Palette" size={20} className="mr-2 text-primary" />
          Interface Customization
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <div
              key={theme.value}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                settings.theme === theme.value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => handleInputChange('theme', theme.value)}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon name={theme.icon} size={20} className="text-text-primary" />
                {settings.theme === theme.value && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </div>
              <h4 className="font-medium text-text-primary">{theme.label}</h4>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-text-primary">Compact Mode</h4>
              <p className="text-sm text-text-secondary">Reduce spacing and padding for more content</p>
            </div>
            <button
              onClick={() => handleToggle('compactMode')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.compactMode ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.compactMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
            <div>
              <h4 className="font-medium text-text-primary">Animations</h4>
              <p className="text-sm text-text-secondary">Enable smooth transitions and animations</p>
            </div>
            <button
              onClick={() => handleToggle('animations')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.animations ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.animations ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemPreferencesTab;