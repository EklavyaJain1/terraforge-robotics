import { createServer } from "node:http";
import * as Sentry from "@sentry/node";
import { createApp } from "./app.ts";
import { env, isProduction } from "./env.ts";

const app = createApp();
const server = createServer(app);
const port = isProduction ? env.PORT : env.API_PORT;

server.listen(port, () => {
  console.log(`FarmBro API listening on http://localhost:${port}/`);
});

async function shutdown(signal: string) {
  console.log(`${signal} received, shutting down`);
  server.close(async () => {
    await Sentry.close(2000);
    process.exit(0);
  });
}

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));
