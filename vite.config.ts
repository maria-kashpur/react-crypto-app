import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/react-cripto-app/",
  resolve: {
    alias: {
      "@": "/src",
      "@assets": "/src/assets",
    },
  },
});
