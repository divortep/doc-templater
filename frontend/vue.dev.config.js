const BundleTracker = require("webpack-bundle-tracker");
const webpack = require('webpack');

module.exports = {
  publicPath: "http://localhost:8080/",
  outputDir: './dist/',
  runtimeCompiler: true,

  chainWebpack: config => {
    config.optimization.splitChunks(false);

    config.plugin('BundleTracker')
        .use(BundleTracker, [{filename: './webpack-stats.json'}]);

    config.plugin('define').tap((definitions) => {
      definitions[0]['process.env']['BASE_URL'] = JSON.stringify('http://localhost:8000');
      return definitions;
    });

    config.resolve.alias
        .set('__STATIC__', 'static');

    config.devServer
        .public('http://localhost:8080')
        .host('0.0.0.0')
        .port(8080)
        .hotOnly(true)
        .watchOptions({poll: 1000})
        .https(false)
        .headers({"Access-Control-Allow-Origin": "http://localhost:8000"});
  },

  pluginOptions: {
    quasar: {
      rtlSupport: true,
      treeShake: true
    }
  },

  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/,
  ]
};