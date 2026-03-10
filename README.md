# SystemLog - Request Logger

A simple Express.js application that logs all incoming requests to a file and console.

## Features

- Logs all HTTP requests (any method, any endpoint)
- Captures timestamp, IP address, HTTP method, URL, and headers
- Saves logs to `access.log` file in JSON format
- Health check endpoint for monitoring

## Docker Setup

### Prerequisites
- Docker
- Docker Compose

### Running with Docker Compose

1. **Start the application:**
   ```bash
   docker-compose up -d
   ```

2. **View logs:**
   ```bash
   docker-compose logs -f systemlog
   ```

3. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Accessing the Application

- Application runs on: `http://localhost:5757`
- Health check: `http://localhost:5757/health`
- Any other endpoint will be logged and return "Request logged"

### Log Files

- Logs are persisted in `./logs/` directory on your host machine
- Main access log is available at `./access.log`
- Docker container logs: `docker-compose logs systemlog`

### Development

To rebuild after code changes:
```bash
docker-compose up --build
```

To run in development mode:
```bash
npm start
```

## Example Request Log

```json
{
  "time": "2026-03-10T10:30:00.000Z",
  "ip": "::1",
  "method": "GET",
  "url": "/api/test",
  "headers": {
    "host": "localhost:5757",
    "user-agent": "curl/7.68.0",
    "accept": "*/*"
  }
}
```