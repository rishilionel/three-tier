# Use Node.js as base image
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists) to the container
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire application to the container
COPY . .

# Build the React app
RUN npm run build

# Use Nginx as base image for serving static files
FROM nginx:alpine

# Copy build files from the previous stage to Nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
