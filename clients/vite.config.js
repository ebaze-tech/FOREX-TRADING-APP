import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Environment variables are automatically loaded by Vite
  define: {
    'process.env.REACT_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
});
