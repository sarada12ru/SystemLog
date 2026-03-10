# Use the official Node.js runtime as base image
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Create directory for logs
RUN mkdir -p /app/logs

# Expose the port the app runs on
EXPOSE 5757

# Command to run the application
CMD ["node", "index.js"]