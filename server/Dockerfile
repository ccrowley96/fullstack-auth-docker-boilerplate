# download a base version of node from Docker Hub
FROM node:14

# create the working directory for the application called /app that will be the root
WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]

EXPOSE 5000
