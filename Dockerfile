# ============================================
# Stage 1: Build
# ============================================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@latest

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build arguments for environment variables
ARG VITE_API_URL=""
ENV VITE_API_URL=${VITE_API_URL}

# Build the application
RUN pnpm build

# ============================================
# Stage 2: Production
# ============================================
FROM nginx:alpine AS production

# Add labels for metadata
LABEL maintainer="SIMANIS Team"
LABEL description="SIMANIS - Sistem Informasi Manajemen PKM"
LABEL version="1.0.0"

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html


# Switch to non-root user
USER nginx

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
