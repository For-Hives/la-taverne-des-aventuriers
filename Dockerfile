# Stage de build
FROM node:20-alpine AS builder

WORKDIR /usr/app

# Copie des fichiers nécessaires pour le build
COPY package*.json ./
COPY ./src ./src
COPY ./public ./public
COPY ./next.config.ts ./
COPY ./next.config.js ./
COPY ./tsconfig.json ./

# Définition des arguments pour le build
ARG PB_SERVER_URL
ARG PB_USER_EMAIL
ARG PB_USER_PASSWORD

# Configuration des variables d'environnement pour le build
ENV PB_SERVER_URL=$PB_SERVER_URL
ENV PB_USER_EMAIL=$PB_USER_EMAIL
ENV PB_USER_PASSWORD=$PB_USER_PASSWORD
ENV NEXT_SHARP_PATH=./node_modules/sharp

# Installation des dépendances et build
RUN npm ci
RUN npm run build

# Stage de production
FROM node:20-alpine

WORKDIR /usr/app

# Copie des fichiers nécessaires depuis le stage de build
COPY --from=builder /usr/app/.next ./.next
COPY --from=builder /usr/app/public ./public
COPY --from=builder /usr/app/package*.json ./
COPY --from=builder /usr/app/node_modules ./node_modules

# Définition des arguments pour la production
ARG PB_SERVER_URL
ARG PB_USER_EMAIL
ARG PB_USER_PASSWORD

# Configuration des variables d'environnement pour la production
ENV PB_SERVER_URL=$PB_SERVER_URL
ENV PB_USER_EMAIL=$PB_USER_EMAIL
ENV PB_USER_PASSWORD=$PB_USER_PASSWORD
ENV NEXT_SHARP_PATH=./node_modules/sharp
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
