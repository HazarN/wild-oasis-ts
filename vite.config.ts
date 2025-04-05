import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

import path from 'path';

const pathResolve = (dir: string): string => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const PORT: number = parseInt(env.VITE_PORT as string) || 5000;

  return {
    plugins: [react()],
    server: { port: PORT },
    resolve: {
      alias: {
        '@app': pathResolve('src'),
        '@data': pathResolve('src/data'),
        '@features': pathResolve('src/features'),
        '@hooks': pathResolve('src/hooks'),
        '@models': pathResolve('src/models'),
        '@pages': pathResolve('src/pages'),
        '@services': pathResolve('src/services'),
        '@styles': pathResolve('src/styles'),
        '@ui': pathResolve('src/ui'),
        '@utils': pathResolve('src/utils'),
      },
    },
  };
});
