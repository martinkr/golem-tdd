#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

function startServers() {
  console.log("Starting servers...");
  console.log("Serving users service on http://localhost:3001/");
  console.log("Serving products service on http://localhost:3002/");
  console.log("Serving orders service on http://localhost:3003/");
  console.log("Serving aggreegations service on http://localhost:3000/");
  console.log("run $ node index.js\n");

  // Start users on port 3001
  const userService = spawn(
    "npx",
    ["node", path.join(__dirname, "services", "user-service")],
    {
      stdio: "inherit",
      shell: true,
    }
  );

  // Start products on port 3002
  const productServer = spawn(
    "npx",
    ["node", path.join(__dirname, "services", "product-service")],
    {
      stdio: "inherit",
      shell: true,
    }
  );

  // Start orders on port 3003
  const orderService = spawn(
    "npx",
    ["node", path.join(__dirname, "services", "order-service")],
    {
      stdio: "inherit",
      shell: true,
    }
  );

  // Start api gateway on port 3000
  const aggregationService = spawn(
    "npx",
    ["node", path.join(__dirname, "services", "aggregation-service")],
    {
      stdio: "inherit",
      shell: true,
    }
  );

  process.on("SIGINT", () => {
    userService.kill();
    productServer.kill();
    orderService.kill();
    aggregationService.kill();
    process.exit(0);
  });
}
startServers();
