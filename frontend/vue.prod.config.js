const BundleTracker = require("webpack-bundle-tracker");
const webpack = require('webpack');

module.exports = {
  publicPath: "/static",
  outputDir: './dist/',

  chainWebpack: config => {
    config.optimization.splitChunks(false);

    config.plugin('BundleTracker')
        .use(BundleTracker, [{filename: './webpack-stats.json'}]);

    config.plugin('define').tap((definitions) => {
      definitions[0]['process.env']['BASE_URL'] = JSON.stringify('http://localhost');
      return definitions;
    });

    config.resolve.alias
        .set('__STATIC__', 'static');
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