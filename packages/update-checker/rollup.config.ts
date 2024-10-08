import type { RollupOptions } from 'rollup';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { fileURLToPath } from 'url';
import commonjs from '@rollup/plugin-commonjs';

const config: RollupOptions = {
  input: './src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'es',
      entryFileNames: 'update-checker.min.js',
      chunkFileNames: 'chunks/[name]-[hash].js',
      plugins: [terser()],
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
    commonjs(),
  ],
  external: [
    fileURLToPath(
      new URL(
        '../../node_modules/localforage/dist/localforage.js',
        import.meta.url,
      ),
    ),
  ],
};

export default config;
