import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://task-management-hizv.onrender.com', // Backend host
        changeOrigin: true,  // Ensures correct Origin header
        rewrite: (path) => {
          console.log(`Rewriting path: ${path}`);
          return path.replace(/^\/api/, '/api/v1'); // Rewrite '/api' to '/api/v1'
        },
        secure: true,  // Enables HTTPS requests
        onProxyReq: (proxyReq, req, res) => {
          // Log the full URL of the proxied request
          const protocol = req.connection.encrypted ? 'https' : 'http';  // Use 'https' or 'http' based on the connection
          const fullUrl = `${protocol}://${req.headers.host}${req.url}`;
          console.log(`Proxy request URL: ${fullUrl}`);
        },
      },
    },
  },
});