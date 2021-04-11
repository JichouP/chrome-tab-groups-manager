import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import webpack from 'webpack';
import webpackNodeExternals from 'webpack-node-externals';

const rules: webpack.RuleSetRule[] = [
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  },
];

const module: webpack.ModuleOptions = {
  rules,
};

const config: webpack.Configuration = {
  target: 'node',
  entry: {
    content_scripts: path.join(__dirname, 'src', 'content_scripts.ts'),
    background: path.join(__dirname, 'src', 'background.ts'),
    // popup: path.join(__dirname, 'src', 'popup.tsx'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module,
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [new ForkTsCheckerWebpackPlugin(), new CopyPlugin({ patterns: [{ from: '.', context: 'public' }] })],
  externals: [webpackNodeExternals() as any],
};

export default config;
