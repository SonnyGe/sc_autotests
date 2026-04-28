# Use official Playwright image (already contains browsers)
FROM mcr.microsoft.com/playwright:v1.59.1-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Run tests
CMD ["npx", "playwright", "test"]