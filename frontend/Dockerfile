FROM node:18.2-bullseye as build-stage
RUN apt update -y
WORKDIR /usr/src/app/
COPY ./yrap_front/package*.json ./
RUN npm install
COPY ./yrap_front/ .
RUN npm run build

FROM nginx:18.2-bullseye as production-stage
RUN mkdir /app
COPY --from=build-stage /usr/src/app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
