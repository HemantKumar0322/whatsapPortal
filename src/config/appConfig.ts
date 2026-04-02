// App Configuration
export interface AppConfig {
  // Maintenance Mode
  maintenance: {
    enabled: boolean;
    estimatedTime: string;
    progress: number;
    features: string[];
    allowedIPs?: string[]; // IPs that can bypass maintenance mode
  };
  
  // Redirects
  redirects: {
    [key: string]: {
      to: string;
      permanent?: boolean;
      condition?: () => boolean;
    };
  };
  
  // App Settings
  app: {
    name: string;
    version: string;
    description: string;
    contactEmail: string;
  };
}

// Default configuration
export const defaultConfig: AppConfig = {
  maintenance: {
    enabled: false, // Set to true to enable maintenance mode
    estimatedTime: '2 hours',
    progress: 65,
    features: [
      'Enhanced security features',
      'Improved performance',
      'New user interface',
      'Bug fixes and updates'
    ],
    allowedIPs: ['127.0.0.1', '::1'] // Localhost IPs
  },
  
  redirects: {
    // Example redirects - modify as needed
    '/old-page': {
      to: '/',
      permanent: true
    },
    '/legacy': {
      to: '/dashboard',
      permanent: false
    },
    '/beta': {
      to: '/',
      permanent: false,
      condition: () => new Date().getTime() > new Date('2024-12-31').getTime() // Redirect after date
    }
  },
  
  app: {
    name: 'SITE Admin',
    version: '1.0.0',
    description: 'SITE Admin',
    contactEmail: 'maksoodaalam121@gmail.com'
  }
};

// Helper functions
export const isMaintenanceMode = (): boolean => {
  return defaultConfig.maintenance.enabled;
};

export const getMaintenanceConfig = () => {
  return defaultConfig.maintenance;
};

export const getRedirect = (path: string) => {
  return defaultConfig.redirects[path];
};

export const shouldRedirect = (path: string): boolean => {
  const redirect = getRedirect(path);
  if (!redirect) return false;
  
  if (redirect.condition) {
    return redirect.condition();
  }
  
  return true;
};

export const getRedirectTarget = (path: string): string | null => {
  const redirect = getRedirect(path);
  return redirect ? redirect.to : null;
};

// Function to check if current IP is allowed during maintenance
export const isAllowedIP = (): boolean => {
  // This is a simplified check - in production, you'd get the actual IP
  // For now, we'll assume localhost is always allowed
  return true;
};

// Function to enable/disable maintenance mode
export const setMaintenanceMode = (enabled: boolean) => {
  defaultConfig.maintenance.enabled = enabled;
  // In a real app, you might want to persist this to localStorage or API
  localStorage.setItem('maintenanceMode', enabled.toString());
};

// Function to load maintenance mode from storage
export const loadMaintenanceMode = () => {
  const stored = localStorage.getItem('maintenanceMode');
  if (stored !== null) {
    defaultConfig.maintenance.enabled = stored === 'true';
  }
};

// Initialize maintenance mode from storage
loadMaintenanceMode(); 