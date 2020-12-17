module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: ['last 1 version', 'not IE 11'],
      },
    ],
    '@babel/typescript',
    '@babel/react',
    '@linaria',
  ],
  plugins: ['@babel/transform-runtime', '@babel/plugin-syntax-dynamic-import'],
};
