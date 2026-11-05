import http from "node:http";

const PORT = process.env.PORT || 3000;

export function createServer() {
  return http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.url === "/health") {
      res.writeHead(200);
      return res.end(JSON.stringify({
        status: "healthy",
        timestamp: new Date().toISOString()
      }));
    }

    if (req.url === "/") {
      res.writeHead(200);
      return res.end(JSON.stringify({
        application: "Self-Healing GitOps Platform",
        message: "Application is running"
      }));
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not found" }));
  });
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  createServer().listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
  });
}
