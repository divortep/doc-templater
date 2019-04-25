FROM node:11-alpine

ARG ENV
ENV NODE_ENV=${ENV}

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./
USER node

RUN if [ "$ENV" = "production" ]; \
  then npm install --only=production; \
	else npm install;  \
	fi

COPY --chown=node:node . .

RUN if [ "$ENV" = "production" ]; \
	then npm run build; \
	fi