import { execSync } from "child_process";
import path from "path";
import { logger, run } from "./utilities";

(() => {
  logger(`Staring running install script ...`);

  run([
    {
      description: "install in dashboard module",
      fn: () =>
        Promise.resolve(
          execSync(
            `cd ${path.join(
              __dirname,
              "../src/apps/dashboardModule"
            )} && pnpm i`
          )
        ) as any,
    },
    {
      description: "install in host app",
      fn: () =>
        Promise.resolve(
          execSync(
            `cd ${path.join(__dirname, "../src/apps/hostApp")} && pnpm i`
          )
        ),
    },
    {
      description: "install in news module",
      fn: () =>
        Promise.resolve(
          execSync(
            `cd ${path.join(__dirname, "../src/apps/newsModule")} && pnpm i`
          )
        ),
    },
    {
      description: "install in settings module",
      fn: () =>
        Promise.resolve(
          execSync(
            `cd ${path.join(__dirname, "../src/apps/settingsModule")} && pnpm i`
          )
        ),
    },
  ]);

  logger(`Finished running install script!`);
})();
