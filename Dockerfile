# Based on nextjs with-docker: https://github.com/vercel/next.js/blob/5ebc6d064f8d3b0ad44c4576bbdfff6c1d3adbc4/examples/with-docker/Dockerfile#L1

# Install dependencies only when needed
FROM docker.registry.vptech.eu/node:18-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM docker.registry.vptech.eu/node:18-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json

COPY . .

RUN yarn build

# Production image, copy all the files and run next
FROM docker.registry.vptech.eu/node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

CMD node server.js
