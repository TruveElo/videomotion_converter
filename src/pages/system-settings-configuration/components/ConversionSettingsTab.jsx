import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConversionSettingsTab = ({ settings, onSettingsChange }) => {
  const [previewSettings, setPreviewSettings] = useState(null);

  const handleInputChange = (field, value) => {
    onSettingsChange('conversionSettings', { ...settings, [field]: value });
  };

  const handlePreviewSettings = () => {
    setPreviewSettings({
      frameRate: settings.frameRate || 12,
      quality: settings.quality || 'high',
      batchSize: settings.batchSize || 5,
      priority: settings.priority || 'normal'
    });
  };

  const qualityPresets = [
    { value: 'low', label: 'Low (Fast)', description: 'Optimized for speed, lower file size' },
    { value: 'medium', label: 'Medium (Balanced)', description: 'Balance between quality and speed' },
    { value: 'high', label: 'High (Quality)', description: 'Best quality, larger file size' },
    { value: 'ultra', label: 'Ultra (Premium)', description: 'Maximum quality, longest processing time' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', description: 'Background processing' },
    { value: 'normal', label: 'Normal', description: 'Standard processing' },
    { value: 'high', label: 'High', description: 'Priority processing' },
    { value: 'urgent', label: 'Urgent', description: 'Immediate processing' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Settings" size={20} className="mr-2 text-primary" />
          Stop Motion Parameters
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Default Frame Rate (FPS)
            </label>
            <Input
              type="number"
              placeholder="12"
              value={settings.frameRate || ''}
              onChange={(e) => handleInputChange('frameRate', parseInt(e.target.value))}
              min="1"
              max="60"
            />
            <p className="text-text-secondary text-xs mt-1">
              Recommended: 12-24 FPS for stop motion
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Batch Size Limit
            </label>
            <Input
              type="number"
              placeholder="5"
              value={settings.batchSize || ''}
              onChange={(e) => handleInputChange('batchSize', parseInt(e.target.value))}
              min="1"
              max="20"
            />
            <p className="text-text-secondary text-xs mt-1">
              Maximum files processed simultaneously
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Output Resolution
            </label>
            <select
              value={settings.resolution || '1080p'}
              onChange={(e) => handleInputChange('resolution', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="720p">720p (1280x720)</option>
              <option value="1080p">1080p (1920x1080)</option>
              <option value="1440p">1440p (2560x1440)</option>
              <option value="4k">4K (3840x2160)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Compression Level
            </label>
            <Input
              type="range"
              min="1"
              max="10"
              value={settings.compression || 5}
              onChange={(e) => handleInputChange('compression', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>Low (Larger files)</span>
              <span>Current: {settings.compression || 5}</span>
              <span>High (Smaller files)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2 text-primary" />
          Quality Presets
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {qualityPresets.map((preset) => (
            <div
              key={preset.value}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                settings.quality === preset.value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => handleInputChange('quality', preset.value)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-text-primary">{preset.label}</h4>
                {settings.quality === preset.value && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </div>
              <p className="text-sm text-text-secondary">{preset.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Clock" size={20} className="mr-2 text-primary" />
          Processing Priority
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {priorityOptions.map((option) => (
            <div
              key={option.value}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                settings.priority === option.value
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => handleInputChange('priority', option.value)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-text-primary">{option.label}</h4>
                {settings.priority === option.value && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </div>
              <p className="text-sm text-text-secondary">{option.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading-semibold text-text-primary flex items-center">
            <Icon name="Eye" size={20} className="mr-2 text-primary" />
            Settings Preview
          </h3>
          <Button
            variant="outline"
            onClick={handlePreviewSettings}
            iconName="Play"
            iconPosition="left"
          >
            Preview Settings
          </Button>
        </div>
        
        {previewSettings && (
          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{previewSettings.frameRate}</div>
                <div className="text-xs text-text-secondary">FPS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary capitalize">{previewSettings.quality}</div>
                <div className="text-xs text-text-secondary">Quality</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{previewSettings.batchSize}</div>
                <div className="text-xs text-text-secondary">Batch Size</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary capitalize">{previewSettings.priority}</div>
                <div className="text-xs text-text-secondary">Priority</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversionSettingsTab;