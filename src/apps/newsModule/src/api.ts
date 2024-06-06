import { createApp } from "vue";
import App from "./app.vue";
import "./index.css";

export const NewsModuleApi = {
  alert: () => alert("NewsModuleApi"),
  render: (htmlElement: HTMLElement) => {
    createApp(App).mount(htmlElement);
  },
};
