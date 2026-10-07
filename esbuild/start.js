import * as esbuild from 'esbuild';
import Common from './common.js';
import dotenv from 'dotenv';
dotenv.config();

const define = {};

for (const k in process.env) {
  define[`process.env.${k}`] = JSON.stringify(process.env[k]);
}

const ctx = await esbuild.context({
  ...Common,
  entryPoints: ['example/src/index.tsx'],
  outdir: 'www/build',
  define,
});

ctx.serve({
  // Serve index.html for client-side routes such as /search
  fallback: 'www/index.html',

  servedir: 'www',
  port: Number(process.env.PORT) || 5000,
});
