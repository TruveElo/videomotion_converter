import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ onFilesSelected, acceptedFormats, maxFileSize }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    onFilesSelected(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    onFilesSelected(files);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
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
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border hover:border-primary/50 hover:bg-surface/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFormats.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            isDragOver ? 'bg-primary text-primary-foreground' : 'bg-accent/10 text-accent'
          }`}>
            <Icon name="Upload" size={32} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-heading-semibold text-text-primary">
              {isDragOver ? 'Drop files here' : 'Upload Video Files'}
            </h3>
            <p className="text-sm text-text-secondary">
              Drag and drop your video files here, or click to browse
            </p>
          </div>
          
          <Button
            variant="primary"
            onClick={openFileDialog}
            iconName="FolderOpen"
            iconPosition="left"
            className="mx-auto"
          >
            Browse Files
          </Button>
        </div>
      </div>
      
      <div className="bg-surface border border-border rounded-lg p-4">
        <h4 className="text-sm font-heading-medium text-text-primary mb-3">
          Supported Formats & Requirements
        </h4>
        <div className="space-y-2 text-xs text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="FileVideo" size={14} className="text-accent" />
            <span>Formats: {acceptedFormats.join(', ')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="HardDrive" size={14} className="text-accent" />
            <span>Max file size: {formatFileSize(maxFileSize)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} className="text-accent" />
            <span>Max duration: 30 minutes per file</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Layers" size={14} className="text-accent" />
            <span>Batch upload: Up to 10 files at once</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;