import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rewriteAll from './vite-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    rewriteAll(),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      // Proxy API requests to your backend
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true
      }
    }
  },
  // This ensures the base path is handled correctly in development
  base: '/',
  // Enable source maps for better debugging
  build: {
    sourcemap: true,
    // This ensures the build output is compatible with SPA routing
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor modules
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['framer-motion', '@supabase/supabase-js']
        }
      }
    }
  }
});