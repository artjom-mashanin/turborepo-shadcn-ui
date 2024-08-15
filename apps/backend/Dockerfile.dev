FROM node:20 AS builder

WORKDIR /app

COPY . /app

WORKDIR /app

RUN yarn
RUN yarn build

FROM node:20-alpine

COPY --from=builder /app /app

WORKDIR /app

CMD ["node", "./dist/main"]
