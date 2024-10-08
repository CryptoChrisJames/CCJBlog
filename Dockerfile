FROM oven/bun:latest
RUN ls -la

WORKDIR /app


COPY package.json .

RUN bun install

COPY . .

EXPOSE 7777

CMD ["bun", "server.ts"]