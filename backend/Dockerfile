FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package manifests and install only production dependencies
COPY package*.json ./
RUN npm ci --production

# Copy source code
COPY . .

# Expose the port from your .env (PORT=8000)
ENV PORT=8000
EXPOSE 8000

# Start the backend
CMD ["node", "server.js"]
