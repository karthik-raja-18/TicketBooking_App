FROM node:18-alpine

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY backend/ .
COPY frontend/ ../frontend/

EXPOSE 8080

CMD ["node", "index.js"]
