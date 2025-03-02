# Use Node.js base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port (match the one your LIFF app runs on)
EXPOSE 3001

# Run the LIFF app in development mode
CMD ["npm", "start"]