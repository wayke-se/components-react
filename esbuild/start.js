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
  servedir: 'www',
  port: 5000,
});
