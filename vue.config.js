// vue.config.js
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}
const vueConfig = {
  publicPath: './',
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: { // 删除注释
              comments: false
            },
            // 生产环境自动删除console
            compress: {
              // warnings: false, // 若打包错误，则注释这行
              drop_debugger: true, // 清除 debugger 语句
              drop_console: true, // 清除console语句
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,
          parallel: true
        })
      ]
    }
  },
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
