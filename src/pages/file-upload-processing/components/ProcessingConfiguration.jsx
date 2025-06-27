import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProcessingConfiguration = ({ 
  settings, 
  onSettingsChange, 
  awsEndpoints, 
  onStartProcessing, 
  hasFiles 
}) => {
  const frameRateOptions = [
    { value: 12, label: '12 FPS (Cinematic)' },
    { value: 15, label: '15 FPS (Smooth)' },
    { value: 24, label: '24 FPS (Standard)' },
    { value: 30, label: '30 FPS (High Quality)' }
  ];

  const qualityPresets = [
    { value: 'low', label: 'Low (Fast)', description: '720p, High compression' },
    { value: 'medium', label: 'Medium (Balanced)', description: '1080p, Standard compression' },
    { value: 'high', label: 'High (Quality)', description: '1080p, Low compression' },
    { value: 'ultra', label: 'Ultra (Premium)', description: '4K, Minimal compression' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Settings" size={20} className="text-primary" />
          <h3 className="text-lg font-heading-semibold text-text-primary">
            Conversion Settings
          </h3>
        </div>
        
        <div className="space-y-4">
          {/* Frame Rate Selection */}
          <div>
            <label className="block text-sm font-heading-medium text-text-primary mb-2">
              Frame Rate
            </label>
            <div className="grid grid-cols-2 gap-2">
              {frameRateOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onSettingsChange({ ...settings, frameRate: option.value })}
                  className={`p-3 text-left border rounded-lg transition-all ${
                    settings.frameRate === option.value
                      ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-text-secondary'
                  }`}
                >
                  <div className="text-sm font-medium">{option.value} FPS</div>
                  <div className="text-xs opacity-75">{option.label.split(' ').slice(1).join(' ')}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quality Preset */}
          <div>
            <label className="block text-sm font-heading-medium text-text-primary mb-2">
              Quality Preset
            </label>
            <div className="space-y-2">
              {qualityPresets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => onSettingsChange({ ...settings, quality: preset.value })}
                  className={`w-full p-3 text-left border rounded-lg transition-all ${
                    settings.quality === preset.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-sm font-medium ${
                        settings.quality === preset.value ? 'text-primary' : 'text-text-primary'
                      }`}>
                        {preset.label}
                      </div>
                      <div className="text-xs text-text-secondary">{preset.description}</div>
                    </div>
                    {settings.quality === preset.value && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AWS Endpoint Selection */}
          <div>
            <label className="block text-sm font-heading-medium text-text-primary mb-2">
              AWS Upload Endpoint
            </label>
            <div className="relative">
              <select
                value={settings.awsEndpoint}
                onChange={(e) => onSettingsChange({ ...settings, awsEndpoint: e.target.value })}
                className="w-full p-3 border border-border rounded-lg bg-surface text-text-primary focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
              >
                {awsEndpoints.map((endpoint) => (
                  <option key={endpoint.id} value={endpoint.id}>
                    {endpoint.name} - {endpoint.region}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
              />
            </div>
          </div>

          {/* Advanced Settings Toggle */}
          <div className="pt-2 border-t border-border">
            <button
              onClick={() => onSettingsChange({ ...settings, showAdvanced: !settings.showAdvanced })}
              className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80"
            >
              <Icon 
                name={settings.showAdvanced ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
              />
              <span>Advanced Settings</span>
            </button>
            
            {settings.showAdvanced && (
              <div className="mt-4 space-y-3 pl-4 border-l-2 border-primary/20">
                <div>
                  <label className="block text-sm font-heading-medium text-text-primary mb-1">
                    Custom Output Name Pattern
                  </label>
                  <Input
                    type="text"
                    placeholder="{filename}_stopmotion_{timestamp}"
                    value={settings.outputPattern || ''}
                    onChange={(e) => onSettingsChange({ ...settings, outputPattern: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="preserveMetadata"
                    checked={settings.preserveMetadata || false}
                    onChange={(e) => onSettingsChange({ ...settings, preserveMetadata: e.target.checked })}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <label htmlFor="preserveMetadata" className="text-sm text-text-primary">
                    Preserve original metadata
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Start Processing Button */}
      <Button
        variant="primary"
        onClick={onStartProcessing}
        disabled={!hasFiles}
        iconName="Play"
        iconPosition="left"
        fullWidth
        className="h-12"
      >
        {hasFiles ? 'Start Processing' : 'Add Files to Begin'}
      </Button>
    </div>
  );
};

export default ProcessingConfiguration;