# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@latest

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm build


# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
