# Docker Setup for SIMANIS

Complete guide to build and deploy SIMANIS using Docker.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Production Build](#production-build)
- [Development Mode](#development-mode)
- [Docker Commands](#docker-commands)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### Production
```bash
docker-compose up -d
```
Access at: http://localhost:3000

### Development
```bash
docker-compose -f docker-compose.dev.yml up -d
```
Access at: http://localhost:5173

## 📦 Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- 2GB RAM minimum
- 5GB disk space

## 📁 Project Structure

```
├── Dockerfile              # Production multi-stage build
├── Dockerfile.dev          # Development with hot reload
├── docker-compose.yml      # Production services
├── docker-compose.dev.yml  # Development services
├── nginx.conf              # Nginx configuration
├── .dockerignore           # Exclude from build
└── DOCKER.md               # This documentation
```

## 🏭 Production Build

### Using Docker Compose (Recommended)

```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f frontend

# Stop
docker-compose down
```

### Using Docker Build

```bash
# Build image
docker build -t simanis-frontend:latest .

# Run container
docker run -d \
  --name simanis-frontend \
  -p 3000:80 \
  simanis-frontend:latest

# View logs
docker logs -f simanis-frontend

# Stop
docker stop simanis-frontend
docker rm simanis-frontend
```

### With Environment Variables

```bash
# Build with API URL
docker build \
  --build-arg VITE_API_URL=https://api.example.com \
  -t simanis-frontend:latest .

# Or using .env file
echo "VITE_API_URL=https://api.example.com" > .env
docker-compose up -d --build
```

## 🔧 Development Mode

### Using Docker Compose

```bash
# Start development with hot reload
docker-compose -f docker-compose.dev.yml up -d --build

# View logs
docker-compose -f docker-compose.dev.yml logs -f frontend-dev

# Stop
docker-compose -f docker-compose.dev.yml down
```

### Features

- ✅ Hot Module Replacement (HMR)
- ✅ Fast Refresh
- ✅ Volume mounting for live code changes
- ✅ Port 5173 exposed
- ✅ Source maps enabled

## 💻 Docker Commands Reference

### Images

```bash
# List images
docker images | grep simanis

# Remove old images
docker rmi simanis-frontend:old

# Prune unused images
docker image prune -a
```

### Containers

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Execute command in container
docker-compose exec frontend sh

# View resource usage
docker stats simanis-frontend
```

### Logs

```bash
# Follow logs
docker-compose logs -f frontend

# Last 100 lines
docker-compose logs --tail=100 frontend

# Since specific time
docker-compose logs --since 1h frontend

# Export logs
docker-compose logs frontend > app.log
```

### Cleanup

```bash
# Stop and remove containers
docker-compose down

# Remove volumes
docker-compose down -v

# Complete cleanup
docker-compose down -v --rmi all --remove-orphans

# System prune
docker system prune -a --volumes
```

## 🔑 Environment Variables

### Available Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | - | Backend API URL |
| `FRONTEND_PORT` | 3000 | Frontend port (production) |
| `DEV_PORT` | 5173 | Dev server port |
| `NODE_ENV` | production | Environment mode |

### Using .env File

Create `.env` file:
```bash
# Production
VITE_API_URL=https://api.simanis.unsil.ac.id
FRONTEND_PORT=3000

# Development
VITE_API_URL=http://localhost:8000
DEV_PORT=5173
```

Then run:
```bash
docker-compose up -d
```

### Build Arguments

```yaml
# In docker-compose.yml
services:
  frontend:
    build:
      args:
        - VITE_API_URL=https://api.example.com
```

## 🔍 Troubleshooting

### Build Issues

#### Problem: Build fails with module not found

```bash
# Clean rebuild
docker-compose down
docker-compose build --no-cache
```

#### Problem: Port already in use

```bash
# Check what's using the port
netstat -ano | findstr :3000  # Windows
lsof -i :3000                  # Linux/Mac

# Change port in docker-compose.yml
ports:
  - "8080:80"  # Use 8080 instead of 3000
```

#### Problem: Container exits immediately

```bash
# Check logs
docker-compose logs frontend

# Common causes:
# 1. Build failed - check build logs
# 2. Port conflict - change port mapping
# 3. Volume mount issue - check .dockerignore
```

### Runtime Issues

#### Problem: 502 Bad Gateway

```bash
# Check container status
docker-compose ps

# Restart container
docker-compose restart frontend
```

#### Problem: Hot reload not working (dev)

```bash
# Ensure volumes are mounted correctly
docker-compose -f docker-compose.dev.yml config

# Check if file changes are detected
docker-compose -f docker-compose.dev.yml logs -f frontend-dev

# Rebuild if needed
docker-compose -f docker-compose.dev.yml up -d --build --force-recreate
```

#### Problem: White screen / JS errors

```bash
# Check browser console for errors
# Verify nginx.conf has correct try_files
docker-compose exec frontend cat /etc/nginx/conf.d/default.conf

# Check build output
docker-compose exec frontend ls -la /usr/share/nginx/html
```

### Performance Issues

#### Problem: Large image size

```bash
# Check image size
docker images | grep simanis

# Should be ~30-50MB for production
# If larger, check:
# 1. Node modules not excluded in .dockerignore
# 2. Build artifacts not cleaned
# 3. Multi-stage build not working
```

#### Problem: Slow build

```bash
# Use BuildKit for faster builds
export DOCKER_BUILDKIT=1

# Leverage layer caching
# - Copy package.json first
# - Run pnpm install separately
# - Copy source code last
```

## 🛡️ Security

### Best Practices Implemented

1. **Non-root user**: Runs as `nginx` user (not root)
2. **Minimal base image**: Uses Alpine Linux
3. **Security headers**: XSS, clickjacking protection
4. **No secrets in image**: Use environment variables
5. **Read-only filesystem**: Where possible
6. **Health checks**: For container monitoring

### Scanning for Vulnerabilities

```bash
# Scan image with Docker Scout
docker scout simanis-frontend:latest

# Or with Trivy
trivy image simanis-frontend:latest

# Or with Snyk
snyk test --docker simanis-frontend:latest
```

## 📊 Monitoring

### Health Check

```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' simanis-frontend

# Manual health check
wget --quiet --tries=1 --spider http://localhost:3000
```

### Metrics

```bash
# Container stats
docker stats simanis-frontend

# Resource usage
docker stats --no-stream
```

### Logging

```bash
# Configure logging in docker-compose.yml
services:
  frontend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## 🚢 Deployment

### Deploy to Docker Hub

```bash
# Tag image
docker tag simanis-frontend:latest username/simanis:latest

# Login
docker login

# Push
docker push username/simanis:latest
```

### Deploy to Private Registry

```bash
# Tag for private registry
docker tag simanis-frontend:latest registry.example.com/simanis:latest

# Push
docker push registry.example.com/simanis:latest
```

### Using in Production

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  frontend:
    image: simanis-frontend:latest
    restart: always
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=${VITE_API_URL}
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [Docker Best Practices](https://snyk.io/blog/10-docker-image-security-best-practices/)

## 🆘 Support

For issues and questions:
1. Check [Troubleshooting](#troubleshooting) section
2. Review Docker logs: `docker-compose logs frontend`
3. Check build logs: `docker-compose build --no-cache`
4. Verify environment variables
5. Test locally first: `npm run build`

---

**Version:** 1.0.0
**Last Updated:** 2025-02-04
**Maintainer:** SIMANIS Team
