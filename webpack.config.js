var path = require('path');

module.exports = env => {
  return {
    resolve: {
      modules: [path.resolve('./src'), "node_modules"]
    },
    context: __dirname + '/src',
    entry: './js/app.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      pathinfo: !env.prod,
    },
    devtool: env.prod ? 'source-map' : 'eval',
    bail: env.prod,
    module: {
      loaders: [
        {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      ],
    },
  }
}
