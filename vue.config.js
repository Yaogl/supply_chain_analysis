// vue.config.js
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
const vueConfig = {
//   publicPath: '/',

  chainWebpack: (config) => {
    config.resolve.alias.set('@$', resolve('src'))
  },
  devServer: {
    // development server port 8000
    port: 8000,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      '/api': {
        target: 'http://10.255.66.11:8990',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

module.exports = vueConfig
