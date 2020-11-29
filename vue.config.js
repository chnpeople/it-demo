console.log(process.env.NODE_ENV);
console.log(process.env.VUE_APP_MOCK);
let env = process.env.NODE_ENV;
module.exports = {
  configureWebpack: {
    //关闭 webpack 的性能提示
    performance: {
      hints:false
    }
  },
  publicPath: env === "development" ? "/" : "./",
  devServer: {
    contentBase: "web",
    // contentBase: path.join(__dirname, 'dist'),
    port: 8081,
    proxy: {
      "/json": {
        target: "https://api.ithome.com/json",
        changeOrigin: true,
        pathRewrite: {
          "^/json": "",
        },
      },
      "/news": {
        target: "https://m.ithome.com/api/news",
        changeOrigin: true,
        pathRewrite: {
          "^/news": "",
        },
      },
      "/version": {
        target: "http://tim007.xyz:8383/version",
        changeOrigin: true,
        pathRewrite: {
          "^/version": "",
        },
      },
    },
  },
};
