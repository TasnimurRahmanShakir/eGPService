# syntax=docker/dockerfile:1
ARG NODE_VERSION=20-alpine

# ==========================================
# Stage 1: Turbo Pruner
# ==========================================
FROM node:${NODE_VERSION} AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install global turbo matching workspace major version
RUN npm install -g turbo@^2

# Copy entire monorepo into pruner
COPY . .

# Generate a pruned workspace containing only admin app and required packages
RUN turbo prune --scope=admin --docker

# ==========================================
# Stage 2: Monorepo Dependency & App Builder
# ==========================================
FROM node:${NODE_VERSION} AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable pnpm via corepack
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@11.23.0 --activate

# Step 1: Install dependencies first (layer caching)
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile

# Step 2: Copy source code and build
COPY --from=pruner /app/out/full/ .

# Build admin application with Next.js standalone mode
ENV NODE_ENV=production
RUN pnpm turbo run build --filter=admin

# ==========================================
# Stage 3: Minimal Production Runner
# ==========================================
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3001 \
    HOSTNAME="0.0.0.0"

# Create non-root system user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output and static assets from builder
COPY --from=builder --chown=nextjs:nodejs /app/apps/admin/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/admin/.next/static ./apps/admin/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/admin/public ./apps/admin/public

USER nextjs

EXPOSE 3001

CMD ["node", "apps/admin/server.js"]
