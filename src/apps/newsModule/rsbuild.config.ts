import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";

export default defineConfig({
  html: {
    template: "./static/index.html",
  },
  server: {
    port: 3300,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: "http://localhost:3300",
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      // You need to set a unique value that is not equal to other applications
      config.output!.uniqueName = "newsModule";
      appendPlugins([
        new ModuleFederationPlugin({
          name: "newsModule",
          exposes: {
            ".": "./src/api.ts",
            "./": "./src/api.ts",
            "./api": "./src/api.ts",
          },
          shared: ["vue"],
          dts: false,
        }),
      ]);
    },
  },
  plugins: [pluginVue()],
});
