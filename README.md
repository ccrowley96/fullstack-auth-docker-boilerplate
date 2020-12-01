# fullstack-boilerplate
MERN ft. GraphQL boilerplate for fellow coder(wo)manz

## Create .env with the following fields
|Key | Value|
|-------- | -----|
|PORT | 3000|
|MONGO_CONNECT_DEV | mongodb://127.0.0.1:27017|

## Install dependencies
Make sure to run `npm install`.  You may also need to run `npm install -g nodemon` in order to get the hot reloading dev server to work.

## Start the server & client
To start the server in dev mode run: `npm run server-dev`
to start the client in dev mode, change directory into the client and run: `npm start`

## Test Graph QL Queries
Navigate to `http://localhost:3000/graphql` to play around with your API and make test queries.  Note `3000` should be replaced with the port you set in the .env file.

