/* eslint-disable no-console */
import * as esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import npmDts from 'npm-dts';
import packageJson from '../package.json' assert { type: 'json' };

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
  force: true,
});

try {
  await generator.generate();
} catch (e) {
  console.log('Error occured while generating types');
} finally {
  console.timeEnd(timetaken);
}
