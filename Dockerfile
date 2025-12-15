# Build stage
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Usamos el script 'build' del package.json que ya tiene el fix de openssl-legacy-provider
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage
ENV TZ=Europe/Madrid
# Copiar configuración personalizada de Nginx para SPA (History Mode)
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
