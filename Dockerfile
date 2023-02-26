# syntax=docker/dockerfile:1
FROM node:18.14.2-alpine3.17 as builder
ARG GITHUB_TOKEN
ARG MONGODB_URI
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ENV MONGODB_URI=$MONGODB_URI
RUN npm install -g pnpm
COPY ["package.json", "pnpm-lock.yaml", ".npmrc", "./"]
COPY ["tsconfig*.json", "."]
USER node
RUN pnpm install --frozen-lockfile && rm -f .npmrc
COPY --chown=node:node . .
RUN pnpm build

FROM node:18.14.2-alpine3.17
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --from=builder --chown=node:node /home/node/app/dist ./
COPY --from=builder --chown=node:node /home/node/app/config ./config
COPY --from=builder --chown=node:node /home/node/app/node_modules ./node_modules
USER node
EXPOSE 3030
CMD ["node", "main.js"]