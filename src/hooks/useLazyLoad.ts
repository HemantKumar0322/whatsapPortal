import { useState, useEffect, useCallback } from 'react';

interface LazyLoadState {
  isLoading: boolean;
  hasError: boolean;
  error?: Error;
}

interface UseLazyLoadOptions {
  preload?: boolean;
  timeout?: number;
}

export const useLazyLoad = (
  importFn: () => Promise<any>,
  options: UseLazyLoadOptions = {}
): LazyLoadState => {
  const { preload = false, timeout = 10000 } = options;
  const [state, setState] = useState<LazyLoadState>({
    isLoading: false,
    hasError: false,
  });

  const loadModule = useCallback(async () => {
    setState({ isLoading: true, hasError: false });
    
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Loading timeout')), timeout);
      });

      await Promise.race([importFn(), timeoutPromise]);
      setState({ isLoading: false, hasError: false });
    } catch (error) {
      console.error('Lazy load error:', error);
      setState({ 
        isLoading: false, 
        hasError: true, 
        error: error instanceof Error ? error : new Error('Unknown error') 
      });
    }
  }, [importFn, timeout]);

  useEffect(() => {
    if (preload) {
      loadModule();
    }
  }, [preload, loadModule]);

  return state;
};

// Hook for preloading specific pages
export const usePagePreloader = () => {
  const preloadPage = useCallback((pageName: string) => {
    const importMap: Record<string, () => Promise<any>> = {
      'home': () => import('../pages/Home'),
      'dashboard': () => import('../pages/DashboardMain'),
      'team': () => import('../pages/Team'),
      'login': () => import('../pages/Login'),
      'notFound': () => import('../pages/NotFound'),
    };

    const importFn = importMap[pageName.toLowerCase()];
    if (importFn) {
      // Preload without waiting for result
      importFn().catch(console.error);
    }
  }, []);

  return { preloadPage };
}; 