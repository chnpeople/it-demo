console.log(process.env.NODE_ENV);
console.log(process.env.VUE_APP_MOCK);
let env = process.env.NODE_ENV;
module.exports = {
  publicPath: env === "development" ? "/" : "./",
  devServer: {
    contentBase: "web",
    // contentBase: path.join(__dirname, 'dist'),
    port: 8080,
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
    },
  },
};
