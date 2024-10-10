# FROM node:20-alpine AS build-stage
FROM 172.22.121.50/library/node:20-alpine as build-stage

WORKDIR /app

RUN npm install -g pnpm --registry=http://172.22.121.51:8081/repository/npm-public
COPY package*.json /app/ 
RUN pnpm install --frozen-lockfile --registry=http://172.22.121.51:8081/repository/npm-public

COPY ./ /app/
RUN pnpm run lint
RUN pnpm run build


# FROM node:20-alpine AS production-stage
FROM 172.22.121.50/library/node:20-alpine as production-stage

WORKDIR /app

COPY --from=builder /app/.next ./app/.next
COPY --from=builder /app/node_modules ./app/node_modules
COPY --from=builder /app/package*.json ./app
COPY --from=builder /app/public ./app/public

EXPOSE 3000/tcp

CMD ["npm","run","start"]