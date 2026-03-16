import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// Clear specific environment variables
delete process.env['CommonProgramFiles(x86)'];
delete process.env['ProgramFiles(x86)'];

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const target = env.VITE_API_ENDPOINT || 'http://localhost:5000';

    return {
        plugins: [
            react(),
            tsconfigPaths(),
            EnvironmentPlugin('all'),
            tailwindcss(),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            proxy: {
                '/api': {
                    target,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),

                    secure: false,
                },
            },
        },
    };
});
