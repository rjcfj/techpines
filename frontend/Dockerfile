FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

# Instalar ignorando conflitos de peer deps
RUN apk add --no-cache python3 make g++ \
  && npm ci --legacy-peer-deps

COPY . .

EXPOSE 5173

CMD ["npm", "start"]
