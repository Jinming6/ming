import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';
import type { RollupOptions } from 'rollup';

dotenv.config();

const config: RollupOptions = {
  input: 'src/main.ts',
  output: [
    {
      dir: 'dist',
      format: 'es',
      entryFileNames: 'es/ming-tool.min.js',
      chunkFileNames: 'es/chunks/[name]-[hash].js',
      plugins: [terser()],
      globals: {
        lodashEs: '_',
        compareVersions: 'compareVersions',
      },
      manualChunks(id: string) {
        if (id.includes('node_modules')) {
          return 'vendor';
        }
      },
    },
    {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: 'cjs/ming-tool.min.js',
      chunkFileNames: 'cjs/chunks/[name]-[hash].js',
      plugins: [terser()],
      globals: {
        lodashEs: '_',
        compareVersions: 'compareVersions',
      },
      manualChunks(id: string) {
        if (id.includes('node_modules')) {
          return 'vendor';
        }
      },
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    nodeResolve(),
    replace({
      'process.env.PACKAGE_NAME': JSON.stringify(process.env.PACKAGE_NAME),
      preventAssignment: true,
    }),
  ],
  external: ['lodashEs', 'compareVersions'],
};
export default config;
