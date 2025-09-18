import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Proxy para o Cosmos DB para evitar problemas de CORS
      '/cosmos': {
        target: 'https://cosmosdb-funilform.documents.azure.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cosmos/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            // Adicionar headers necessários para o Cosmos DB
            const date = new Date().toUTCString();
            proxyReq.setHeader('Authorization', 'type=master&ver=1.0&sig=Opfq0bQsmIv0Fjfa1ZAXuijANjE7JmFMgvOl8YE3eszb8f8DiPc1cOEhebQEjq7othCIiqGiFBf2ACDbVAfYCg==');
            proxyReq.setHeader('x-ms-version', '2018-12-31');
            proxyReq.setHeader('x-ms-date', date);
          });
        }
      }
    }
  }
})
