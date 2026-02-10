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

# Replace nginx config completely (no defaults)
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default html
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

# Fix permissions so non-root nginx can read files
RUN chown -R frontend:frontend /usr/share/nginx/html /etc/nginx \
 && chmod -R 755 /usr/share/nginx/html

USER frontend

EXPOSE 8080

# Healthcheck (simple & reliable)
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD test -f /usr/share/nginx/html/index.html || exit 1

CMD ["nginx", "-g", "daemon off;"]
