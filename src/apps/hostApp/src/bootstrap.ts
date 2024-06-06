import { DashboardModuleApi } from "dashboardModule/api";
import { NewsModuleApi } from "newsModule/api";
import { SettingsModuleApi } from "settingsModule/api";
import "./components/date";
import "./index.css";

document.querySelector("#root")!.innerHTML = `
<div class="content">
  <h1>Vanilla Rsbuild</h1>
  <p>Start building amazing things with Rsbuild.</p>
  <current-date></current-date>
</div>
`;

DashboardModuleApi.render(document.querySelector("#svelteContent")!);
NewsModuleApi.render(document.querySelector("#vueContent")!);
SettingsModuleApi.render(document.querySelector("#reactContent")!);
console.log("test");
