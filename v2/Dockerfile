FROM oven/bun:latest

WORKDIR /app

RUN ls -la

COPY package.json .

RUN bun install

COPY . .

EXPOSE 7777

CMD ["bun", "server.ts"]