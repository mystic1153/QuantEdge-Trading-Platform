# Stage 1: Build the React app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Accept build arguments (passed from docker-compose.yml or build command)
ARG REACT_APP_BACKEND_URL

# Set as environment variables for npm run build
# React reads REACT_APP_* vars ONLY during build, not at runtime
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}

# Build the React app - REACT_APP_* vars are baked into the bundle
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

