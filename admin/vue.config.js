module.exports = {
  publicPath: './',
  assetsDir: './',
  lintOnSave: false,
  devServer: {
    proxy: 'http://localhost:3000'
  },
  configureWebpack: {
    externals: {
      "BMap": "BMap"
    },
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  }
}
