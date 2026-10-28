# Use the official Node.js image as the base image
FROM node:14-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Use a minimal NGINX image to serve the frontend
FROM nginx:alpine

# Copy the build files to the NGINX html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port NGINX will run on
EXPOSE 80

# Start the NGINX server
CMD ["nginx", "-g", "daemon off;"]
