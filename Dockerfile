FROM node:22-slim AS build

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:22-slim AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN mkdir -p /app/data

COPY package.json package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY src/infrastructure/database/migrations ./src/infrastructure/database/migrations

EXPOSE 3000

CMD ["node", "dist/src/server.js"]
