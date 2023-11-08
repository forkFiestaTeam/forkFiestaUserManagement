# Start from the official Node.js LTS base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose the listening port
EXPOSE 3002

# Run npm start script
CMD ["node", "index.js"]