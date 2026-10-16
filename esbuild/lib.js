/* eslint-disable no-console */
import { execSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import * as esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import packageJson from '../package.json' with { type: 'json' };

const Shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  logLevel: 'info',
  external: Object.keys(packageJson.dependencies || {}).concat(
    Object.keys(packageJson.peerDependencies || {})
  ),
  loader: {
    '.js': 'jsx',
    '.woff': 'file',
    '.woff2': 'file',
    '.gif': 'file',
    '.svg': 'dataurl',
    '.png': 'dataurl',
  },
};

const ctx = esbuild.build({
  ...Shared,
  outfile: 'dist/index.js',
  plugins: [
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['./assets/**/*'],
        to: ['./dist/assets'],
      },
      watch: true,
    }),
  ],
});

await ctx;

const ctxEsm = esbuild.build({
  ...Shared,
  outfile: 'dist/index.mjs',
  format: 'esm',
});

await ctxEsm;

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
