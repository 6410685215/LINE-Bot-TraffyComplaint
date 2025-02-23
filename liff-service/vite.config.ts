import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ff',
  server: {
    host: '0.0.0.0',  // Expose to all interfaces
    port: 3001,
    allowedHosts: [
      'traffy-liff.newzealandnorth.cloudapp.azure.com',  // Add your allowed host here
      'localhost', // Optionally allow localhost as well
    ]
  },

  optimizeDeps: {
    include: ['react-leaflet', 'leaflet']
  }
});
