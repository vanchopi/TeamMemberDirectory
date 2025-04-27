const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: ["quasar"],
  publicPath:
    process.env.NODE_ENV === "production" ? "/TeamMemberDirectory/" : "/",
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@tests": path.resolve(__dirname, "tests"),
      },
    },
  },
});
