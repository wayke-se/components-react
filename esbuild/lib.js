/* eslint-disable no-console */
import { execSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import * as esbuild from 'esbuild';
import packageJson from '../package.json' with { type: 'json' };
import Common from './common.js';

// ESM build for bundlers. The dependencies stay external, except buy online: ecom-web and
// its SDK are bundled into a chunk of their own, loaded when a buyer starts it, so a site
// needs no setup for them.
await esbuild.build({
  ...Common,
  entryPoints: { index: 'src/index.ts' },
  outdir: 'dist',
  chunkNames: 'chunks/[name]-[hash]',
  format: 'esm',
  splitting: true,
  minify: true,
  sourcemap: true,
  logLevel: 'info',
  external: Object.keys(packageJson.dependencies || {})
    .concat(Object.keys(packageJson.peerDependencies || {}))
    .filter((name) => name !== '@wayke-se/ecom-web'),
  define: {
    // Read by the bundled ecom SDK and postcss (via sanitize-html); a browser has no `process`.
    'process.env.WAYKE_ECOM_API_ADDRESS': 'undefined',
    'process.env.LANG': 'undefined',
  },
});

// The one stylesheet: the components and buy online, with their fonts.
await esbuild.build({
  ...Common,
  entryPoints: { style: 'src/style.css' },
  outdir: 'dist',
  assetNames: 'assets/[name]-[hash]',
  minify: true,
  logLevel: 'info',
});

const timetaken = '⚡ Generating types done in';
console.time(timetaken);

// tsc emits one .d.ts per source file to dist/types. dist/index.d.ts re-exports the entry
// point, so the "types" path in package.json stays the same as when npm-dts bundled them.
// Fail the build if types are missing: 5.0.0–5.0.3 were published without index.d.ts.
try {
  execSync('npx tsc --project tsconfig.build.json', { stdio: 'inherit' });
  writeFileSync(
    'dist/index.d.ts',
    "export * from './types/src/index';\nexport { default } from './types/src/index';\n"
  );
} catch (e) {
  console.error('Error occurred while generating types', e);
  process.exit(1);
} finally {
  console.timeEnd(timetaken);
}

if (!existsSync('dist/types/src/index.d.ts')) {
  console.error('Type generation produced no dist/types/src/index.d.ts, aborting build');
  process.exit(1);
}
