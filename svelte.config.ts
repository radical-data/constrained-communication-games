import adapter from '@sveltejs/adapter-node';
import { Config } from '@sveltejs/kit';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config: Config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter()
    },
    
};

export default config;
