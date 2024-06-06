import ReactDOM from "react-dom/client";
import { App } from "./app";
import "./app.css";

export const SettingsModuleApi = {
  alert: () => alert("SettingsModuleApi"),
  render: (htmlElement: HTMLElement) => {
    const root = ReactDOM.createRoot(htmlElement!);
    root.render(<App />);
  },
};
