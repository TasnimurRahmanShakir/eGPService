ARG NODE_VERSION=22-alpine

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

# Generate a pruned workspace containing only web app and required packages
RUN turbo prune --scope=web --docker

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
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Step 2: Copy source code and build
COPY --from=pruner /app/out/full/ .

# Build web application with Next.js standalone mode
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=production
RUN pnpm turbo run build --filter=web

# ==========================================
# Stage 3: Minimal Production Runner
# ==========================================
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

# Create non-root system user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output and static assets from builder
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
