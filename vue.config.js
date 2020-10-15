const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/',
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')).set('assets', resolve('src/assets'))
  },
  devServer: {
    disableHostCheck: true,
    port: 9090,
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  lintOnSave: true,
}
