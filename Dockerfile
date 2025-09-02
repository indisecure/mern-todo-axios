# Stage 1: Build the React frontend
FROM node:22-alpine AS frontend-builder
WORKDIR /app/client

COPY ./client/package*.json ./
RUN npm install
COPY ./client/ .
RUN npm run build

# Stage 2: Serve the backend and the built frontend
FROM node:22-alpine
WORKDIR /app

COPY ./backend/package*.json ./
RUN npm install --omit=dev
COPY ./backend/ .

# Copy the built frontend from the previous stage to the backend directory
COPY --from=frontend-builder /app/client/dist ./dist

EXPOSE 5000

CMD ["node", "server.js"]v
