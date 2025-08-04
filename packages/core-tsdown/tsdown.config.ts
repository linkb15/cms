import { paraglideRolldownPlugin } from '@inlang/paraglide-js';
import { defineConfig } from 'tsdown';
import path from 'node:path';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig({
  entry: ['src/index.ts'],

  // clean: true,
  dts: true,

  sourcemap: true,

  format: ['cjs', 'esm'],
  treeshake: true,

  outDir: './dist',
  platform: 'browser',

  alias: {
    '@': path.resolve(__dirname, './src'),
  },

  external: ['react', 'react-dom'],

  plugins: [
    // postcss({
    //   extract: true,
    //   plugins: [tailwindcss],
    // }) as any,
    paraglideRolldownPlugin({
      project: './project.inlang',
      outdir: './src/paraglide',
      strategy: ['url', 'cookie'],
      urlPatterns: [
        {
          pattern: '/:path(.*)?',
          localized: [
            ['de', '/de/:path(.*)?'],
            // ✅ make sure to match the least specific path last
            ['en', '/:path(.*)?'],
          ],
        },
      ],
    }) as any,
  ],
});
