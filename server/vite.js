import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function log(message, source = "express") {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${timestamp} [${source}] ${message}`);
}

export async function setupVite(app, server) {
  const vite = await createViteServer({
    root: resolve(__dirname, "../client"),
    server: {
      middlewareMode: true,
      hmr: { server },
    },
  });

  app.use(vite.ssrFix);
  app.use(vite.middlewares);

  return vite;
}

export function serveStatic(app) {
  const express = await import("express");
  const path = await import("path");
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  
  app.use(express.default.static(resolve(__dirname, "../dist/public")));
  
  app.get("*", (req, res) => {
    res.sendFile(resolve(__dirname, "../dist/public/index.html"));
  });
}