import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import FileUploadZone from './components/FileUploadZone';
import FileCard from './components/FileCard';
import ProcessingConfiguration from './components/ProcessingConfiguration';
import ProcessingQueue from './components/ProcessingQueue';
import ProcessingStats from './components/ProcessingStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FileUploadProcessing = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [processingQueue, setProcessingQueue] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStats, setProcessingStats] = useState({
    totalProcessed: 12,
    inProgress: 0,
    failed: 2,
    queueSize: 0
  });
  
  const [settings, setSettings] = useState({
    frameRate: 24,
    quality: 'medium',
    awsEndpoint: 'us-east-1',
    showAdvanced: false,
    outputPattern: '{filename}_stopmotion_{timestamp}',
    preserveMetadata: true
  });

  // Mock data for AWS endpoints
  const awsEndpoints = [
    { id: 'us-east-1', name: 'US East (N. Virginia)', region: 'us-east-1' },
    { id: 'us-west-2', name: 'US West (Oregon)', region: 'us-west-2' },
    { id: 'eu-west-1', name: 'Europe (Ireland)', region: 'eu-west-1' },
    { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)', region: 'ap-southeast-1' }
  ];

  const acceptedFormats = ['.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv'];
  const maxFileSize = 500 * 1024 * 1024; // 500MB

  // Mock processing queue data
  const mockQueueItems = [
    {
      id: 'proc_001',
      fileName: 'vacation_video.mp4',
      fileSize: 45 * 1024 * 1024,
      status: 'processing',
      progress: 67,
      estimatedTime: 180,
      awsUploaded: false
    },
    {
      id: 'proc_002',
      fileName: 'birthday_party.avi',
      fileSize: 78 * 1024 * 1024,
      status: 'completed',
      progress: 100,
      estimatedTime: 0,
      awsUploaded: true
    },
    {
      id: 'proc_003',
      fileName: 'wedding_ceremony.mov',
      fileSize: 120 * 1024 * 1024,
      status: 'error',
      progress: 23,
      estimatedTime: 0,
      errorMessage: 'Unsupported codec detected. Please use H.264 encoding.',
      awsUploaded: false
    },
    {
      id: 'proc_004',
      fileName: 'sports_highlight.mp4',
      fileSize: 32 * 1024 * 1024,
      status: 'waiting',
      progress: 0,
      estimatedTime: 240,
      awsUploaded: false
    }
  ];

  useEffect(() => {
    // Initialize with mock queue data
    setProcessingQueue(mockQueueItems);
    setProcessingStats(prev => ({
      ...prev,
      queueSize: mockQueueItems.length,
      inProgress: mockQueueItems.filter(item => item.status === 'processing').length
    }));
  }, []);

  // Simulate processing progress
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProcessingQueue(prev => prev.map(item => {
          if (item.status === 'processing' && item.progress < 100) {
            const newProgress = Math.min(item.progress + Math.random() * 5, 100);
            const newStatus = newProgress >= 100 ? 'completed' : 'processing';
            return {
              ...item,
              progress: newProgress,
              status: newStatus,
              estimatedTime: newStatus === 'completed' ? 0 : Math.max(item.estimatedTime - 5, 0)
            };
          }
          return item;
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const validateFile = (file) => {
    const errors = [];
    
    // Check file type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!acceptedFormats.includes(fileExtension)) {
      errors.push(`Unsupported format: ${fileExtension}`);
    }
    
    // Check file size
    if (file.size > maxFileSize) {
      errors.push('File size exceeds 500MB limit');
    }
    
    return errors;
  };

  const handleFilesSelected = (files) => {
    const validFiles = [];
    const invalidFiles = [];
    
    files.forEach(file => {
      const errors = validateFile(file);
      if (errors.length === 0) {
        validFiles.push({
          ...file,
          id: Date.now() + Math.random(),
          duration: Math.floor(Math.random() * 1800) + 60 // Mock duration
        });
      } else {
        invalidFiles.push({ file, errors });
      }
    });
    
    if (invalidFiles.length > 0) {
      // In a real app, show error notifications
      console.warn('Invalid files:', invalidFiles);
    }
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleStartProcessing = () => {
    if (selectedFiles.length === 0) return;
    
    const newQueueItems = selectedFiles.map(file => ({
      id: `proc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      fileName: file.name,
      fileSize: file.size,
      status: 'waiting',
      progress: 0,
      estimatedTime: Math.floor(Math.random() * 300) + 120,
      awsUploaded: false
    }));
    
    setProcessingQueue(prev => [...prev, ...newQueueItems]);
    setSelectedFiles([]);
    setIsProcessing(true);
    
    // Start processing the first waiting item
    setTimeout(() => {
      setProcessingQueue(prev => prev.map((item, index) => 
        index === prev.length - newQueueItems.length ? { ...item, status: 'processing' } : item
      ));
    }, 1000);
  };

  const handlePauseAll = () => {
    setIsProcessing(false);
    setProcessingQueue(prev => prev.map(item => 
      item.status === 'processing' ? { ...item, status: 'paused' } : item
    ));
  };

  const handleResumeAll = () => {
    setIsProcessing(true);
    setProcessingQueue(prev => prev.map(item => 
      item.status === 'paused' ? { ...item, status: 'processing' } : item
    ));
  };

  const handleClearQueue = () => {
    setProcessingQueue([]);
    setIsProcessing(false);
  };

  const handleRetryItem = (item) => {
    setProcessingQueue(prev => prev.map(queueItem => 
      queueItem.id === item.id 
        ? { ...queueItem, status: 'processing', progress: 0, errorMessage: null }
        : queueItem
    ));
    setIsProcessing(true);
  };

  const handleRemoveItem = (itemId) => {
    setProcessingQueue(prev => prev.filter(item => item.id !== itemId));
  };

  const handlePreviewItem = (item) => {
    // Mock preview functionality
    console.log('Preview item:', item);
  };

  const handleDownloadItem = (item) => {
    // Mock download functionality
    console.log('Download item:', item);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Upload" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-heading-bold text-text-primary">
                  File Upload & Processing
                </h1>
                <p className="text-text-secondary">
                  Upload video files and convert them to stop motion format
                </p>
              </div>
            </div>
          </div>

          {/* Processing Stats */}
          <div className="mb-8">
            <ProcessingStats stats={processingStats} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-heading-semibold text-text-primary mb-4">
                  Upload Files
                </h2>
                <FileUploadZone
                  onFilesSelected={handleFilesSelected}
                  acceptedFormats={acceptedFormats}
                  maxFileSize={maxFileSize}
                />
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-md font-heading-semibold text-text-primary">
                      Selected Files ({selectedFiles.length})
                    </h3>
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedFiles([])}
                      iconName="Trash2"
                      iconSize={16}
                      className="text-error hover:text-error"
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                      <FileCard
                        key={file.id}
                        file={file}
                        index={index}
                        onRemove={handleRemoveFile}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Configuration Section */}
            <div>
              <h2 className="text-lg font-heading-semibold text-text-primary mb-4">
                Processing Configuration
              </h2>
              <ProcessingConfiguration
                settings={settings}
                onSettingsChange={setSettings}
                awsEndpoints={awsEndpoints}
                onStartProcessing={handleStartProcessing}
                hasFiles={selectedFiles.length > 0}
              />
            </div>
          </div>

          {/* Processing Queue */}
          <div>
            <ProcessingQueue
              queue={processingQueue}
              onPauseAll={handlePauseAll}
              onResumeAll={handleResumeAll}
              onClearQueue={handleClearQueue}
              onRetryItem={handleRetryItem}
              onRemoveItem={handleRemoveItem}
              onPreviewItem={handlePreviewItem}
              onDownloadItem={handleDownloadItem}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default FileUploadProcessing;