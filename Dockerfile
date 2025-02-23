FROM node:16 as build-stage
# COPY . ./app
COPY ["package*.json" ,  "/app/"]
WORKDIR /app
# COPY package.json ./
# COPY package*.json ./
RUN npm install -g @quasar/cli
RUN npm install
COPY ["." ,  "/app/"]
RUN quasar build --modern
# production stage
FROM nginx:1.17.5-alpine as production-stage
# Establece el Timezone a Madrid, España
ENV TZ=Europe/Madrid
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
