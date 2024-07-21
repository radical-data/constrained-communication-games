import { sveltekit } from '@sveltejs/kit/vite';
import { webSocketServer } from './src/lib/webSocketPluginVite';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  },
  plugins: [sveltekit(), webSocketServer]
});
