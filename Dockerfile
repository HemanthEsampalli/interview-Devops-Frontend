# ---------- Stage 1: Build ----------
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ---------- Stage 2: Runtime ----------
FROM nginx:1.25-alpine

# Create non-root user
RUN addgroup -S frontend && adduser -S frontend -G frontend

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default html
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

# 🔴 CRITICAL: fix ALL required permissions for non-root nginx
RUN chown -R frontend:frontend \
    /usr/share/nginx/html \
    /etc/nginx \
    /var/cache/nginx \
    /var/run \
 && chmod -R 755 /usr/share/nginx/html \
 && chmod -R 755 /var/cache/nginx

USER frontend

EXPOSE 8080

# Safe healthcheck (no network dependency)
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD test -f /usr/share/nginx/html/index.html || exit 1

CMD ["nginx", "-g", "daemon off;"]
