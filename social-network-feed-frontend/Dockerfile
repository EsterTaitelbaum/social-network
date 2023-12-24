 # Stage 1: Build Angular app
FROM node:14.15.4 as build-stage

WORKDIR /app

COPY social-network-feed-frontend/package*.json ./
RUN npm install

COPY social-network-feed-frontend/ .
RUN npm run build

# Stage 2: Serve Angular app using Nginx
FROM nginx:1.19.6-alpine

COPY --from=build-stage /app/dist/social-network-feed /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
