# syntax=docker/dockerfile:1
FROM node:18.14.2-alpine3.17 as builder
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
RUN npm install -g pnpm
COPY ["package.json", "pnpm-lock.yaml", "./"]
COPY ["tsconfig*.json", "."]
USER node
RUN pnpm fetch
COPY --chown=node:node . .
RUN pnpm install -r --offline --ignore-scripts
RUN pnpm build

FROM node:18.14.2-alpine3.17
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
RUN npm install -g pnpm
COPY --from=builder --chown=node:node /home/node/app/dist ./
COPY --from=builder --chown=node:node /home/node/app/package.json ./package.json
COPY --from=builder --chown=node:node /home/node/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder --chown=node:node /home/node/app/config ./config
USER node
RUN pnpm install --frozen-lockfile -P --ignore-scripts
EXPOSE 3030
CMD ["node", "main.js"]