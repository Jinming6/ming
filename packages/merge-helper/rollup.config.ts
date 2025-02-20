import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';
import type { RollupOptions } from 'rollup';

dotenv.config();

const terserConfig = terser({
  mangle: {
    reserved: [
      'isArray',
      'isString',
      'isPlainObject',
      'isBoolean',
      'cloneDeep',
      'isFunction',
    ],
    properties: false, // 避免属性名被压缩
  },
});

const config: RollupOptions = {
  input: 'src/main.ts',
  output: [
    {
      dir: 'dist',
      format: 'es',
      entryFileNames: 'es/merge-helper.min.js',
      chunkFileNames: 'es/chunks/[name]-[hash].js',
      plugins: [terserConfig],
      manualChunks(id: string) {
        if (id.includes('node_modules')) {
          return 'vendor';
        }
      },
    },
    {
      dir: 'dist',
      format: 'es',
      entryFileNames: 'es/merge-helper.js',
      chunkFileNames: 'es/chunks/[name]-[hash].js',
      manualChunks(id: string) {
        if (id.includes('node_modules')) {
          return 'vendor';
        }
      },
    },
    {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: 'cjs/merge-helper.min.js',
      chunkFileNames: 'cjs/chunks/[name]-[hash].js',
      plugins: [terserConfig],
      manualChunks(id: string) {
        if (id.includes('node_modules')) {
          return 'vendor';
        }
      },
    },
    {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: 'cjs/merge-helper.js',
      chunkFileNames: 'cjs/chunks/[name]-[hash].js',
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
    nodeResolve({
      dedupe: ['lodash-es'], // 避免 lodash-es 被重复打包
      modulesOnly: true, // 只解析 ES 模块，避免 CJS 影响
    }),
    replace({
      'process.env.PACKAGE_NAME': JSON.stringify(process.env.PACKAGE_NAME),
      preventAssignment: true,
    }),
  ],
};

export default config;
