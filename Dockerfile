# 1. Base image
FROM node:20-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies (using package-lock.json or yarn.lock for deterministic builds)
COPY package*.json ./
RUN npm ci

# 4. Copy project files
COPY . .

# 5. Build Next.js app
RUN npm run build

# 6. Production image, copy only necessary files
FROM node:20-alpine AS runner

WORKDIR /app

# If you use .env.production, uncomment below
# COPY .env.production .env

# Copy package files and install only prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built assets and Next.js output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 4000

# Run Next.js
CMD ["npm", "start"]
