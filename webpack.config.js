const path = require('path')

module.exports = {
  // Bundle the full public API surface (src/index.ts), not just the client layer.
  entry: './src/index.ts',
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          // The @de./types alias resolves to source outside src/, so let ts-loader
          // compile it here rather than expecting a pre-built package.
          options: { transpileOnly: true, compilerOptions: { rootDir: undefined } }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    // Mirror the tsconfig `paths` mapping so webpack can resolve @de./types/* subpaths.
    alias: {
      '@de./types': path.resolve(__dirname, '../de.types/src')
    }
  },
  output: {
    // Emitted as dist/index.js so it matches package.json "main".
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'DeSDK',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  }
}