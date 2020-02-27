FROM node as builder

WORKDIR /app
COPY ./ /app

RUN npm install

RUN npm run build

FROM nginx:alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/chrono /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
