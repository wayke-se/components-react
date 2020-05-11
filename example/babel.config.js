module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
  ];

  let plugins = [];

  if (process.env.NODE_ENV !== 'production') {
    plugins.push([
      'babel-plugin-styled-components',
      {
        displayName: true,
        ssr: false,
      },
    ]);
  }

  plugins = [...plugins];

  return {
    presets,
    plugins,
  };
};
