# Build Stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the React application using Vite
RUN npm run build

# Production Stage
FROM node:18-alpine

WORKDIR /app

# Install production dependencies for the server
COPY package*.json ./
RUN npm install --production

# Copy built assets from build stage
COPY --from=build /app/dist ./dist

# Copy the server script
COPY server.js ./

# Expose port 80
EXPOSE 80

# Start Node server
CMD ["node", "server.js"]
