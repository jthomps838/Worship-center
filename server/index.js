import express from "express";
import { registerRoutes } from "./routes.js";
import { log, setupVite, serveStatic } from "./vite.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const originalSend = res.send;
  
  res.send = function(data) {
    const duration = Date.now() - start;
    const truncatedData = typeof data === 'string' && data.length > 50 
      ? data.substring(0, 50) + '…' 
      : data;
    log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms :: ${JSON.stringify(truncatedData).substring(0, 50)}`);
    return originalSend.call(this, data);
  };
  
  next();
});

const server = await registerRoutes(app);

if (process.env.NODE_ENV === "development") {
  await setupVite(app, server);
} else {
  serveStatic(app);
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  log(`serving on port ${PORT}`);
});

// Error handling
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(status).json({ message });
  log(`Error ${status}: ${message}`, 'error');
});