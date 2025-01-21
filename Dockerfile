FROM node:20-alpine AS builder

WORKDIR /usr/app

COPY package*.json ./
COPY ./src ./src
COPY ./public ./public
COPY ./next.config.ts ./
COPY ./tsconfig.json ./

ARG PB_SERVER_URL=""
ARG PB_USER_EMAIL=""
ARG PB_USER_PASSWORD=""

ENV PB_SERVER_URL=$PB_SERVER_URL \
    NEXT_PUBLIC_PB_SERVER_URL=$PB_SERVER_URL \
    PB_USER_EMAIL=$PB_USER_EMAIL \
    NEXT_PUBLIC_PB_USER_EMAIL=$PB_USER_EMAIL \
    PB_USER_PASSWORD=$PB_USER_PASSWORD \
    NEXT_PUBLIC_PB_USER_PASSWORD=$PB_USER_PASSWORD \
    NEXT_SHARP_PATH=./node_modules/sharp \

RUN npm ci
RUN if [ -n "$PB_SERVER_URL" ] && [ -n "$PB_USER_EMAIL" ] && [ -n "$PB_USER_PASSWORD" ]; then \
        echo "Building with PocketBase configuration..." && \
        npm run build; \
    else \
        echo "Warning: PocketBase environment variables are not set" && \
        npm run build; \
    fi

FROM node:20-alpine

WORKDIR /usr/app

COPY --from=builder /usr/app/.next ./.next
COPY --from=builder /usr/app/public ./public
COPY --from=builder /usr/app/package*.json ./
COPY --from=builder /usr/app/node_modules ./node_modules

ARG PB_SERVER_URL=''
ARG PB_USER_EMAIL=''
ARG PB_USER_PASSWORD=''

ENV PB_SERVER_URL=$PB_SERVER_URL \
    NEXT_PUBLIC_PB_SERVER_URL=$PB_SERVER_URL \
    PB_USER_EMAIL=$PB_USER_EMAIL \
    NEXT_PUBLIC_PB_USER_EMAIL=$PB_USER_EMAIL \
    PB_USER_PASSWORD=$PB_USER_PASSWORD \
    NEXT_PUBLIC_PB_USER_PASSWORD=$PB_USER_PASSWORD \
    NEXT_SHARP_PATH=./node_modules/sharp \
    NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
