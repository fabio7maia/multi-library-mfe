import App from "./app.svelte";
import "./index.css";

export const DashboardModuleApi = {
  alert: () => alert("DashboardModuleApi"),
  render: (htmlElement: HTMLElement) => {
    new App({
      target: htmlElement,
    });
  },
};
