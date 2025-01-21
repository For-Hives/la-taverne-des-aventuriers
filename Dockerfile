FROM node:20-alpine

WORKDIR /usr/app

COPY ./.next ./.next
COPY ./public ./public
COPY ./package*.json .
COPY ./src ./src
COPY ./next* .
COPY ./next.config.js .

ARG PB_SERVER_URL
ARG PB_USER_EMAIL
ARG PB_USER_PASSWORD
ENV NEXT_SHARP_PATH=./node_modules/sharp

ENV PB_SERVER_URL=$PB_SERVER_URL
ENV PB_USER_EMAIL=$PB_USER_EMAIL

RUN npm ci --ignore-scripts

EXPOSE 3000

CMD ["npm", "start"]