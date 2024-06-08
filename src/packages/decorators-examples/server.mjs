import { createRsbuild, loadConfig } from "@rsbuild/core";
import koa from "koa";

export async function startDevServer() {
  const { content } = await loadConfig({});

  // Init Rsbuild
  const rsbuild = await createRsbuild({
    rsbuildConfig: content,
  });

  const app = new koa();

  app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get("X-Response-Time");
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  });

  // x-response-time

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set("X-Response-Time", `${ms}ms`);
  });

  // response

  app.use(async (ctx) => {
    ctx.body = "Hello World";
  });

  // Create Rsbuild DevServer instance
  const rsbuildServer = await rsbuild.createDevServer();

  // Apply Rsbuild’s built-in middlewares
  app.use(rsbuildServer.middlewares);

  const httpServer = app.listen(rsbuildServer.port, async () => {
    // Notify Rsbuild that the custom server has started
    await rsbuildServer.afterListen();
  });

  // Subscribe to the server's http upgrade event to handle WebSocket upgrades
  httpServer.on("upgrade", rsbuildServer.onHTTPUpgrade);

  return {
    close: async () => {
      await rsbuildServer.close();
      httpServer.close();
    },
  };
}

startDevServer(process.cwd());
