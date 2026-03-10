const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 5757;

// Health check endpoint for Docker
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Catch all other routes
app.use((req, res) => {
  const log = {
    time: new Date().toISOString(),
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    method: req.method,
    url: req.originalUrl,
    headers: req.headers
  };

  console.log(log);

  fs.appendFileSync("access.log", JSON.stringify(log) + "\n");

  res.send("Request logged");
});

app.listen(PORT, () => {
  console.log(`Logger running on port ${PORT}`);
});