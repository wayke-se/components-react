import * as esbuild from 'esbuild';
import Common from './common.js';

// Self-contained ESM build for cdn.wayke.se: React, styled-components and the ecom
// stylesheet are bundled in, and the imported CSS is emitted as dist-cdn/index.css.
await esbuild.build({
  ...Common,
  entryPoints: { index: 'src/cdn.tsx' },
  outdir: 'dist-cdn',
  format: 'esm',
  minify: true,
  sourcemap: true,
  logLevel: 'info',
  define: {
    // Bundled code reads process.env (e.g. WAYKE_ECOM_API_ADDRESS in ecom); browsers have no `process`.
    'process.env': JSON.stringify({ NODE_ENV: 'production' }),
  },
});
