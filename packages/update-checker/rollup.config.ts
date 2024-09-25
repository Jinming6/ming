import type { RollupOptions } from 'rollup';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const config: RollupOptions = {
  input: './src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'es',
      entryFileNames: 'update-checker.min.js',
      plugins: [terser()],
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
};

export default config;
