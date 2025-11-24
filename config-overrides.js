const { override, addWebpackPlugin } = require("customize-cra");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = override(
  addWebpackPlugin(
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      swDest: "pwa-sw.js",
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|js|css|html)$/,
          handler: "CacheFirst",
        }
      ]
    })
  )
);
