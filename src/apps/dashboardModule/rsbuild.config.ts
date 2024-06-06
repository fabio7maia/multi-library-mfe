import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { defineConfig } from "@rsbuild/core";
import { pluginSvelte } from "@rsbuild/plugin-svelte";

export default defineConfig({
  html: {
    template: "./static/index.html",
  },
  server: {
    port: 3100,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: "http://localhost:3100",
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      // You need to set a unique value that is not equal to other applications
      config.output!.uniqueName = "dashboardModule";
      appendPlugins([
        new ModuleFederationPlugin({
          name: "dashboardModule",
          exposes: {
            ".": "./src/api.ts",
            "./": "./src/api.ts",
            "./api": "./src/api.ts",
          },
          shared: ["svelte"],
          dts: false,
        }),
      ]);
    },
  },
  plugins: [pluginSvelte()],
});
