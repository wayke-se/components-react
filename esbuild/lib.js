/* eslint-disable no-console */
import { existsSync } from 'node:fs';
import * as esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import npmDts from 'npm-dts';
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
const generator = new npmDts.Generator({
  entry: 'src/index.ts',
  output: 'dist/index.d.ts',
  help: true,
  logLevel: 'debug',
});

// Fail the build if types are missing: 5.0.0–5.0.3 were published without index.d.ts
// because this step swallowed the error and the package.json "types" entry pointed at nothing.
try {
  await generator.generate();
} catch (e) {
  console.error('Error occurred while generating types', e);
  process.exit(1);
} finally {
  console.timeEnd(timetaken);
}

if (!existsSync('dist/index.d.ts')) {
  console.error('Type generation produced no dist/index.d.ts, aborting build');
  process.exit(1);
}
