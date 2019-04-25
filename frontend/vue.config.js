const prodConfig = require("./vue.prod.config");
const devConfig = require("./vue.dev.config");

module.exports = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;
