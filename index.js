const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5757;

// Ensure log file exists and is not a directory
const logFile = "access.log";
try {
  const stats = fs.lstatSync(logFile);
  if (stats.isDirectory()) {
    fs.rmSync(logFile, { recursive: true, force: true });
  }
} catch (err) {
  // File doesn't exist, which is fine
}

// Create the log file if it doesn't exist
if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, '');
}

// Health check endpoint for Docker
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Catch all other routes for logging
app.use((req, res) => {
  // Get real IP address, handling various proxy scenarios
  const getClientIP = (req) => {
    return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
           req.headers['x-real-ip'] ||
           req.headers['x-client-ip'] ||
           req.connection?.remoteAddress ||
           req.socket?.remoteAddress ||
           req.ip ||
           'unknown';
  };

  const clientIP = getClientIP(req);
  
  const log = {
    time: new Date().toISOString(),
    ip: clientIP,
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    userAgent: req.headers['user-agent'] || 'unknown'
  };

  console.log(log);

  fs.appendFileSync("access.log", JSON.stringify(log) + "\n");

  res.json({
    message: "Request logged",
    clientIP: clientIP,
    timestamp: log.time
  });
});

app.listen(PORT, () => {
  console.log(`Logger running on port ${PORT}`);
});