import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    allowedHosts: true,
    host: true,
    port: 10000
  }
});
