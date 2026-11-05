import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "./server.js";

test("health endpoint returns healthy status", async () => {
  const server = createServer();

  const response = await new Promise((resolve, reject) => {
    const req = {
      url: "/health"
    };

    const headers = {};
    let statusCode;
    let responseBody = "";

    const res = {
      setHeader(name, value) {
        headers[name] = value;
      },
      writeHead(code) {
        statusCode = code;
      },
      end(body) {
        responseBody = body;
        resolve({
          statusCode,
          headers,
          body: JSON.parse(responseBody)
        });
      }
    };

    server.emit("request", req, res);
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.status, "healthy");
  assert.ok(response.body.timestamp);
});
