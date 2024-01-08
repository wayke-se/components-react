const Common = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'build',
  loader: {
    '.js': 'jsx',
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.eot': 'file',
    '.gif': 'file',
    '.svg': 'dataurl',
    '.png': 'dataurl',
  },
};

export default Common;
