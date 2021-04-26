FROM node:12.16.1-alpine as builder
RUN mkdir homepage
WORKDIR /homepage
ADD . .
RUN yarn install
RUN yarn build

FROM nginx:stable-alpine as production
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN true
COPY --from=builder /homepage/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
