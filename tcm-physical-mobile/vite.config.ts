import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5555,
    host: true,
  },
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          axios: ['axios'],
          chart: ['chart.js'],
          lib: [
            'clsx',
            'input-otp',
            'lucide-react',
            'motion',
            'next-themes',
            'react-hook-form',
            'sonner',
            'tailwind-merge',
            'tailwindcss',
            'zod',
            'zustand',
          ],
        },
      },
    },
  },
});
