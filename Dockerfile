# Multi-stage Dockerfile for Express TypeScript application

# Production build stage
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the TypeScript application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001 -G nodejs

# Copy built application from build stage
COPY --from=build --chown=appuser:nodejs /usr/src/app/dist ./dist

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
