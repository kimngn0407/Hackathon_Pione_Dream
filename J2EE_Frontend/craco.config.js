module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Fix for allowedHosts error
      if (webpackConfig.devServer) {
        webpackConfig.devServer.allowedHosts = 'all';
      }
      return webpackConfig;
    },
  },
  devServer: {
    allowedHosts: 'all',
  },
}; 