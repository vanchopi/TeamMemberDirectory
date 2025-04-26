const { defineConfig } = require("@vue/cli-service");
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
});
