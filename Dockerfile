FROM node:lts-alpine3.17 as build
RUN npm install -g npm@9.4.2
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

 
FROM nginx:1.23.3
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
