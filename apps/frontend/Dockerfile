FROM oven/bun:latest as base
WORKDIR /app
COPY package.json ./
RUN bun install
COPY . .
RUN bun run build

FROM base as development
RUN bun add -g curl
WORKDIR /app
RUN bun nuxi prepare
EXPOSE 3000
ENTRYPOINT [ "bun","dev" ]

FROM node:lts-alpine as production
WORKDIR /app
COPY --from=base /app/.output/ .
EXPOSE 3000
ENTRYPOINT ["node", "server/index.mjs"]