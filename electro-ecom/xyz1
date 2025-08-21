# Stage 1: Build Angular app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json* ./

# Install deps (use ci if lockfile exists, fallback to install otherwise)
RUN if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; else npm install --legacy-peer-deps; fi

# Copy rest of the project
COPY . .

# Build Angular app
RUN npm run build --configuration production


# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Clean default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app
COPY --from=build /app/dist/electro-ecom/browser /usr/share/nginx/html

# (Optional) custom nginx.conf
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
