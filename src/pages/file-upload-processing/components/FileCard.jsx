import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileCard = ({ file, onRemove, index }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'Unknown';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'mp4':
        return 'FileVideo';
      case 'avi':
        return 'Film';
      case 'mov':
        return 'Video';
      case 'mkv':
        return 'FileVideo2';
      default:
        return 'FileVideo';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 hover:shadow-elevated transition-shadow">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name={getFileIcon(file.name)} size={24} className="text-accent" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-heading-medium text-text-primary truncate" title={file.name}>
                {file.name}
              </h4>
              <div className="mt-1 space-y-1">
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <span className="flex items-center space-x-1">
                    <Icon name="HardDrive" size={12} />
                    <span>{formatFileSize(file.size)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{formatDuration(file.duration || Math.floor(Math.random() * 1800) + 60)}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-success">Ready for processing</span>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              onClick={() => onRemove(index)}
              iconName="X"
              iconSize={16}
              className="p-1 text-text-secondary hover:text-error"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileCard;