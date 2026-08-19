# syntax=docker/dockerfile:1
# Dev image — runs `next dev` with hot reload (source is bind-mounted by compose).
# Build from the repo root:  docker build -f cli/dev/Dockerfile -t tabletab .

FROM node:20-alpine
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# PORT is overridden by compose (from APP_PORT); this is just the fallback for a bare `docker build`.
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000
CMD ["npm", "run", "dev"]
