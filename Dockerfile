# Prod docker config

FROM node as prod

ENV NODE_ENV=prod

# Set up and build client

WORKDIR /app/client

COPY ./client/package*.json ./

RUN npm install

COPY ./client ./

RUN npm run build

# Set up server

WORKDIR /app/server

COPY server/package*.json ./

RUN npm install

COPY ./server ./

RUN npm run build

EXPOSE 5000

CMD ["node", "dist/index.js"]