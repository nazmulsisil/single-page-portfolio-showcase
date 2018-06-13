const path = require('path');

module.exports = {
  entry: './src/scripts/App.js',
  output: {
    path: path.resolve(__dirname, 'public', 'scripts'),
    filename: '[Name].js'
  },
  mode: 'production', // development

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    ]
  } // devtool: 'cheap-module-eval-source-map'
};
