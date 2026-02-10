# Stage 1: Build (Nginx)
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# Stage 2: Runtime (Nginx)
FROM nginx:1.25-alpine
RUN addgroup -S frontend && adduser -S frontend -G frontend
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
RUN chown -R frontend:frontend /usr/share/nginx /var/cache/nginx /var/run
USER frontend
EXPOSE 8080
#Health endpoint support
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -q -O /dev/null http://localhost:8080/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
