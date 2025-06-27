import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeProcessingCount, setActiveProcessingCount] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Processing',
      path: '/file-upload-processing',
      icon: 'Upload',
      tooltip: 'File Upload & Processing'
    },
    {
      label: 'Settings',
      path: '/system-settings-configuration',
      icon: 'Settings',
      tooltip: 'System Settings & Configuration'
    }
  ];

  useEffect(() => {
    // Simulate processing count updates
    const interval = setInterval(() => {
      setActiveProcessingCount(Math.floor(Math.random() * 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate connection status monitoring
    const statusInterval = setInterval(() => {
      const statuses = ['connected', 'connecting', 'disconnected'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setConnectionStatus(randomStatus);
    }, 10000);

    return () => clearInterval(statusInterval);
  }, []);

  useEffect(() => {
    // Simulate unsaved changes detection for settings page
    if (location.pathname === '/system-settings-configuration') {
      const changeTimeout = setTimeout(() => {
        setHasUnsavedChanges(Math.random() > 0.5);
      }, 2000);

      return () => clearTimeout(changeTimeout);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting';
      case 'disconnected':
        return 'Disconnected';
      default:
        return 'Unknown';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Wifi';
      case 'connecting':
        return 'Loader';
      case 'disconnected':
        return 'WifiOff';
      default:
        return 'AlertCircle';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Video" size={20} color="white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-heading-semibold text-text-primary">
                  VideoMotion
                </h1>
                <span className="text-xs font-caption-normal text-text-secondary -mt-1">
                  Converter
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div key={item.path} className="relative">
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`nav-item rounded-lg flex items-center space-x-2 ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                  title={item.tooltip}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                  {item.path === '/file-upload-processing' && activeProcessingCount > 0 && (
                    <div className="nav-progress-ring">
                      <span className="bg-accent text-accent-foreground text-xs px-1.5 py-0.5 rounded-full font-medium">
                        {activeProcessingCount}
                      </span>
                    </div>
                  )}
                </button>
                {item.path === '/system-settings-configuration' && hasUnsavedChanges && (
                  <div className="settings-indicator" />
                )}
              </div>
            ))}
          </nav>

          {/* Status and Actions */}
          <div className="flex items-center space-x-4">
            {/* Connection Status Badge */}
            <div className={`status-badge ${connectionStatus}`}>
              <Icon 
                name={getConnectionStatusIcon()} 
                size={12} 
                className={connectionStatus === 'connecting' ? 'animate-spin' : ''}
              />
              <span className="hidden sm:inline">{getConnectionStatusText()}</span>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                onClick={toggleMobileMenu}
                iconName={isMobileMenuOpen ? 'X' : 'Menu'}
                iconSize={20}
                className="p-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="mobile-menu-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="mobile-menu">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Video" size={20} color="white" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-lg font-heading-semibold text-text-primary">
                      VideoMotion
                    </h1>
                    <span className="text-xs font-caption-normal text-text-secondary -mt-1">
                      Converter
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setIsMobileMenuOpen(false)}
                  iconName="X"
                  iconSize={20}
                  className="p-2"
                />
              </div>

              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.path} className="relative">
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full nav-item rounded-lg flex items-center justify-between p-4 ${
                        location.pathname === item.path ? 'active bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={item.icon} size={20} />
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{item.label}</span>
                          <span className="text-xs text-text-secondary">{item.tooltip}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.path === '/file-upload-processing' && activeProcessingCount > 0 && (
                          <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                            {activeProcessingCount}
                          </span>
                        )}
                        {item.path === '/system-settings-configuration' && hasUnsavedChanges && (
                          <div className="w-2 h-2 bg-accent rounded-full animate-pulse-dot" />
                        )}
                        <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                      </div>
                    </button>
                  </div>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-border">
                <div className={`status-badge ${connectionStatus} justify-center`}>
                  <Icon 
                    name={getConnectionStatusIcon()} 
                    size={16} 
                    className={connectionStatus === 'connecting' ? 'animate-spin' : ''}
                  />
                  <span>{getConnectionStatusText()}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;