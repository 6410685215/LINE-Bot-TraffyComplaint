# Use Node.js base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port (match the one your bot runs on)
EXPOSE 3000

# Run the bot in development mode
CMD ["npm", "run", "dev"]
