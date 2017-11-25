module.exports = {
    entry: ['./src/index.js'],
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'imageViewer.js',
    },
    devtool: 'cheap-module-source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: ['babel-loader'],
        },
      ]
    },
    resolve: {
      extensions: ['*', '.js'],
    },
  };
  