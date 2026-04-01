# 1. Use the official Node.js image
FROM node:20-alpine

# 2. Create an app directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json first
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of your app code
COPY . .

# 6. Your port is 5000
EXPOSE 5000

# 7. Start the app (Point to src/server.js)
CMD ["node", "src/server.js"]