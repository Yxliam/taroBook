module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  weapp: {},
  h5: {
    devServer: {
      host: "0.0.0.0",
      port: 10086,
      proxy: {
        "/api": {
          //此处并非一定和url一致。
          target: "http://api.zhuishushenqi.com",
          changeOrigin: true, //允许跨域
          pathRewrite: {
            "^/api": ""
          }
        }
      }
    }
  }
};
