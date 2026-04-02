import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@/components': path.resolve(__dirname, './src/components'),
            '@/pages': path.resolve(__dirname, './src/pages'),
            '@/services': path.resolve(__dirname, './src/services'),
            '@/hooks': path.resolve(__dirname, './src/hooks'),
            '@/utils': path.resolve(__dirname, './src/utils'),
            '@/config': path.resolve(__dirname, './src/config'),
            '@/interface': path.resolve(__dirname, './src/interface'),
            '@/contexts': path.resolve(__dirname, './src/contexts'),
            '@/assets': path.resolve(__dirname, './src/assets'),
            '@/types': path.resolve(__dirname, './src/types'),
        },
    },
    server: {
        port: 3001, // Custom port
        host: true, // Allow external access
        open: true, // Auto-open browser
    },
    preview: {
        port: 3002, // Preview port
        host: true,
    },
    build: {
        outDir: 'dist',
        sourcemap: true, // Enable source maps for debugging
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    antd: ['antd'],
                    router: ['react-router-dom'],
                },
            },
        },
    },
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
        __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
});
