// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";

// vite-rewrite-all.ts
function vitePluginRewriteAll() {
  return {
    name: "rewrite-all",
    configureServer(server) {
      return () => {
        server.middlewares.use((req, _res, next) => {
          if (req.url?.startsWith("/api/") || req.url?.match(/\.[a-zA-Z0-9]+$/) || req.url === "/vite/client" || req.url?.startsWith("/@")) {
            return next();
          }
          req.url = "/";
          next();
        });
      };
    }
  };
}

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [
    react(),
    vitePluginRewriteAll()
  ],
  optimizeDeps: {
    exclude: ["lucide-react"]
  },
  server: {
    proxy: {
      // Proxy API requests to your backend
      "/api": {
        target: "http://localhost:3002",
        changeOrigin: true
      }
    }
  },
  // This ensures the base path is handled correctly in development
  base: "/",
  // Enable source maps for better debugging
  build: {
    sourcemap: true,
    // This ensures the build output is compatible with SPA routing
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor modules
          react: ["react", "react-dom", "react-router-dom"],
          vendor: ["framer-motion", "@supabase/supabase-js"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS1yZXdyaXRlLWFsbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3Byb2plY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcHJvamVjdC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCByZXdyaXRlQWxsIGZyb20gJy4vdml0ZS1yZXdyaXRlLWFsbCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICByZXdyaXRlQWxsKCksXG4gIF0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0J10sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHByb3h5OiB7XG4gICAgICAvLyBQcm94eSBBUEkgcmVxdWVzdHMgdG8geW91ciBiYWNrZW5kXG4gICAgICAnL2FwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAyJyxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvLyBUaGlzIGVuc3VyZXMgdGhlIGJhc2UgcGF0aCBpcyBoYW5kbGVkIGNvcnJlY3RseSBpbiBkZXZlbG9wbWVudFxuICBiYXNlOiAnLycsXG4gIC8vIEVuYWJsZSBzb3VyY2UgbWFwcyBmb3IgYmV0dGVyIGRlYnVnZ2luZ1xuICBidWlsZDoge1xuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICAvLyBUaGlzIGVuc3VyZXMgdGhlIGJ1aWxkIG91dHB1dCBpcyBjb21wYXRpYmxlIHdpdGggU1BBIHJvdXRpbmdcbiAgICBvdXREaXI6ICdkaXN0JyxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgLy8gU3BsaXQgdmVuZG9yIG1vZHVsZXNcbiAgICAgICAgICByZWFjdDogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLFxuICAgICAgICAgIHZlbmRvcjogWydmcmFtZXItbW90aW9uJywgJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcyddXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pOyIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvcHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcHJvamVjdC92aXRlLXJld3JpdGUtYWxsLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS1yZXdyaXRlLWFsbC50c1wiO2ltcG9ydCB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aXRlUGx1Z2luUmV3cml0ZUFsbCgpOiBQbHVnaW4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdyZXdyaXRlLWFsbCcsXG4gICAgY29uZmlndXJlU2VydmVyKHNlcnZlcikge1xuICAgICAgLy8gSGFuZGxlIFNQQSBmYWxsYmFjayBmb3IgZGV2ZWxvcG1lbnRcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHNlcnZlci5taWRkbGV3YXJlcy51c2UoKHJlcSwgX3JlcywgbmV4dCkgPT4ge1xuICAgICAgICAgIC8vIFNraXAgQVBJIHJlcXVlc3RzIGFuZCBzdGF0aWMgYXNzZXRzXG4gICAgICAgICAgaWYgKHJlcS51cmw/LnN0YXJ0c1dpdGgoJy9hcGkvJykgfHwgXG4gICAgICAgICAgICAgIHJlcS51cmw/Lm1hdGNoKC9cXC5bYS16QS1aMC05XSskLykgfHxcbiAgICAgICAgICAgICAgcmVxLnVybCA9PT0gJy92aXRlL2NsaWVudCcgfHxcbiAgICAgICAgICAgICAgcmVxLnVybD8uc3RhcnRzV2l0aCgnL0AnKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gUmV3cml0ZSBhbGwgb3RoZXIgcmVxdWVzdHMgdG8gaW5kZXguaHRtbFxuICAgICAgICAgIHJlcS51cmwgPSAnLyc7XG4gICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSxcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXOzs7QUNDSCxTQUFSLHVCQUFnRDtBQUNyRCxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixnQkFBZ0IsUUFBUTtBQUV0QixhQUFPLE1BQU07QUFDWCxlQUFPLFlBQVksSUFBSSxDQUFDLEtBQUssTUFBTSxTQUFTO0FBRTFDLGNBQUksSUFBSSxLQUFLLFdBQVcsT0FBTyxLQUMzQixJQUFJLEtBQUssTUFBTSxpQkFBaUIsS0FDaEMsSUFBSSxRQUFRLGtCQUNaLElBQUksS0FBSyxXQUFXLElBQUksR0FBRztBQUM3QixtQkFBTyxLQUFLO0FBQUEsVUFDZDtBQUdBLGNBQUksTUFBTTtBQUNWLGVBQUs7QUFBQSxRQUNQLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjs7O0FEbkJBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLHFCQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLGNBQWM7QUFBQSxFQUMxQjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBO0FBQUEsTUFFTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFFQSxNQUFNO0FBQUE7QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQTtBQUFBLElBRVgsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBO0FBQUEsVUFFWixPQUFPLENBQUMsU0FBUyxhQUFhLGtCQUFrQjtBQUFBLFVBQ2hELFFBQVEsQ0FBQyxpQkFBaUIsdUJBQXVCO0FBQUEsUUFDbkQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
