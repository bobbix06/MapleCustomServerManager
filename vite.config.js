import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'a287797d-6992-40b0-a53e-9af2aaaea9df-00-140t3bfawpalq.kirk.replit.dev'
    ],
  },
});
