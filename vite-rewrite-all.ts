import { Plugin } from 'vite';

export default function vitePluginRewriteAll(): Plugin {
  return {
    name: 'rewrite-all',
    configureServer(server) {
      // Handle SPA fallback for development
      return () => {
        server.middlewares.use((req, _res, next) => {
          // Skip API requests and static assets
          if (req.url?.startsWith('/api/') || 
              req.url?.match(/\.[a-zA-Z0-9]+$/) ||
              req.url === '/vite/client' ||
              req.url?.startsWith('/@')) {
            return next();
          }
          
          // Rewrite all other requests to index.html
          req.url = '/';
          next();
        });
      };
    },
  };
}
