FROM node:11-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN mkdir -p /home/node/app/frontend && chown -R node:node /home/node/app
WORKDIR /home/node/app/frontend
COPY package*.json ./
USER node
RUN npm install
