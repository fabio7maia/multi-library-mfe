import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { defineConfig } from "@rsbuild/core";

export default defineConfig({
  html: {
    template: "./static/index.html",
  },
  server: {
    port: 3000,
  },
  tools: {
    rspack: (config, { appendPlugins }) => {
      appendPlugins([
        new ModuleFederationPlugin({
          name: "hostApp",
          remotes: {
            dashboardModule:
              "dashboardModule@http://localhost:3100/mf-manifest.json",
            newsModule: "newsModule@http://localhost:3300/mf-manifest.json",
            settingsModule:
              "settingsModule@http://localhost:3500/mf-manifest.json",
          },
          shared: ["react", "react-dom", "svelte", "vue"],
        }),
      ]);
    },
  },
  plugins: [
    /*pluginReact(), pluginSvelte(), pluginVue()*/
  ],
});
