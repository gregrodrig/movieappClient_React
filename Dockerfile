FROM node:20-alpine3.17 as build
RUN npm install -g npm@9.4.2
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.25.1-alpine-slim
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]