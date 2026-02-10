# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM nginx:1.25-alpine

# Create non-root user
RUN addgroup -S frontend && adduser -S frontend -G frontend

# Remove default content
RUN rm -rf /usr/share/nginx/html/*

# Copy frontend build
COPY --from=build /app/dist /usr/share/nginx/html

# 🔴 Fix 1: Change listen port
RUN sed -i 's/listen\s\+80;/listen 8080;/' /etc/nginx/conf.d/default.conf

# 🔴 Fix 2: Change PID file location
RUN sed -i 's|pid\s\+/var/run/nginx.pid;|pid /tmp/nginx.pid;|' /etc/nginx/nginx.conf

# Permissions
RUN chown -R frontend:frontend \
    /usr/share/nginx \
    /var/cache/nginx \
    /etc/nginx

USER frontend

EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -q -O /dev/null http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
