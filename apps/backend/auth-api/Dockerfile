# Base
FROM oven/bun:latest as base
WORKDIR /app
COPY package.json .
RUN bun install
COPY . .
RUN bun prisma generate
RUN bun run build

# Production
FROM oven/bun:latest as production
RUN bun add -g curl
WORKDIR /app
COPY --from=base /app/node_modules/ ./node_modules/
COPY --from=base /app/dist/main.js .
COPY --from=base /app/package.json .
EXPOSE 3000
ENTRYPOINT ["bun","main.js"]