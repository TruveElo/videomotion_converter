import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingQueue = ({ 
  queue, 
  onPauseAll, 
  onResumeAll, 
  onClearQueue, 
  onRetryItem, 
  onRemoveItem,
  onPreviewItem,
  onDownloadItem,
  isProcessing 
}) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'waiting':
        return 'Clock';
      case 'processing':
        return 'Loader';
      case 'completed':
        return 'CheckCircle';
      case 'error':
        return 'AlertCircle';
      case 'paused':
        return 'Pause';
      default:
        return 'Clock';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'waiting':
        return 'text-warning';
      case 'processing':
        return 'text-accent';
      case 'completed':
        return 'text-success';
      case 'error':
        return 'text-error';
      case 'paused':
        return 'text-text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-accent';
      case 'completed':
        return 'bg-success';
      case 'error':
        return 'bg-error';
      case 'paused':
        return 'bg-text-secondary';
      default:
        return 'bg-warning';
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Queue Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="List" size={20} className="text-primary" />
          <h3 className="text-lg font-heading-semibold text-text-primary">
            Processing Queue
          </h3>
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
            {queue.length} files
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={isProcessing ? onPauseAll : onResumeAll}
            iconName={isProcessing ? 'Pause' : 'Play'}
            iconSize={16}
            disabled={queue.length === 0}
          >
            {isProcessing ? 'Pause All' : 'Resume All'}
          </Button>
          <Button
            variant="ghost"
            onClick={onClearQueue}
            iconName="Trash2"
            iconSize={16}
            disabled={queue.length === 0}
            className="text-error hover:text-error"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Queue Items */}
      <div className="space-y-3">
        {queue.length === 0 ? (
          <div className="text-center py-12 bg-surface border border-border rounded-lg">
            <Icon name="FileVideo" size={48} className="mx-auto text-text-secondary/50 mb-4" />
            <h4 className="text-lg font-heading-medium text-text-secondary mb-2">
              No files in queue
            </h4>
            <p className="text-sm text-text-secondary">
              Upload video files to start processing
            </p>
          </div>
        ) : (
          queue.map((item, index) => (
            <div key={item.id} className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-start space-x-4">
                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon 
                      name={getStatusIcon(item.status)} 
                      size={16} 
                      className={`${getStatusColor(item.status)} ${
                        item.status === 'processing' ? 'animate-spin' : ''
                      }`} 
                    />
                    <h4 className="text-sm font-heading-medium text-text-primary truncate">
                      {item.fileName}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'completed' ? 'bg-success/10 text-success' :
                      item.status === 'error' ? 'bg-error/10 text-error' :
                      item.status === 'processing'? 'bg-accent/10 text-accent' : 'bg-warning/10 text-warning'
                    }`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {/* Progress Bar */}
                    <div className="w-full bg-border rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(item.status)}`}
                        style={{ width: `${item.progress || 0}%` }}
                      />
                    </div>
                    
                    {/* Details */}
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <div className="flex items-center space-x-4">
                        <span>{formatFileSize(item.fileSize)}</span>
                        <span>{item.progress || 0}% complete</span>
                        {item.estimatedTime && (
                          <span>ETA: {formatTime(item.estimatedTime)}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.status === 'completed' && (
                          <>
                            <Button
                              variant="ghost"
                              onClick={() => onPreviewItem(item)}
                              iconName="Eye"
                              iconSize={14}
                              className="p-1 text-accent hover:text-accent"
                            />
                            <Button
                              variant="ghost"
                              onClick={() => onDownloadItem(item)}
                              iconName="Download"
                              iconSize={14}
                              className="p-1 text-success hover:text-success"
                            />
                          </>
                        )}
                        {item.status === 'error' && (
                          <Button
                            variant="ghost"
                            onClick={() => onRetryItem(item)}
                            iconName="RotateCcw"
                            iconSize={14}
                            className="p-1 text-warning hover:text-warning"
                          />
                        )}
                        <Button
                          variant="ghost"
                          onClick={() => onRemoveItem(item.id)}
                          iconName="X"
                          iconSize={14}
                          className="p-1 text-error hover:text-error"
                        />
                      </div>
                    </div>
                    
                    {/* Error Message */}
                    {item.status === 'error' && item.errorMessage && (
                      <div className="bg-error/5 border border-error/20 rounded p-2">
                        <p className="text-xs text-error">{item.errorMessage}</p>
                      </div>
                    )}
                    
                    {/* AWS Upload Status */}
                    {item.status === 'completed' && (
                      <div className="flex items-center space-x-2 text-xs">
                        <Icon 
                          name={item.awsUploaded ? 'CheckCircle' : 'Upload'} 
                          size={12} 
                          className={item.awsUploaded ? 'text-success' : 'text-accent'} 
                        />
                        <span className={item.awsUploaded ? 'text-success' : 'text-accent'}>
                          {item.awsUploaded ? 'Uploaded to AWS' : 'Uploading to AWS...'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProcessingQueue;