module.exports = {
  productionSourceMap: false,

  // Css into bundle
  css: {
    extract: {
      filename: 'css/app.css',
      chunkFilename: 'css/[name].css'
    },
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/styles/_mixins.scss";
          `
      }
    }
  },

  configureWebpack: {
    output: {
      filename: 'js/build.js',
      chunkFilename: 'js/[name].js'
    },
    optimization: {
      splitChunks: {
        maxSize: 100000
      }
    }
  },

  // Configuration to launch eslint when saving changes in the code.
  chainWebpack: config => {
    config.module.rule('eslint')
      .use('eslint-loader')
      .options({ fix: true })
  }
}
