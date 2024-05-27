FROM node:18-alpine
# Use a recent LTS Node.js version

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --silent

# Copy project code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run npm start
CMD [ "npm", "start" ]
