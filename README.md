# fullstack-boilerplate
MERN ft. GraphQL boilerplate for fellow coder(wo)manz

## Create .env with the following fields
|Key | Value|
|-------- | -----|
|PORT | `3000`|
|MONGO_CONNECT_DEV | `mongodb://127.0.0.1:27017/fullstack_boilerplate` (where _fullstack_boilerplate_ is the name of the database your want to use for development)|
|GOOGLE_CLIENT_ID | client ID from console.cloud.google.com|
|JWT_SECRET | any string that is complex and not easy to guess / brute force |

## Install dependencies
Make sure to run `npm install`.  You may also need to run `npm install -g nodemon` in order to get the hot reloading dev server to work.

## Set up Google OAuth Credentials
1. Navigate to console.cloud.google.com
2. Create new project
3. In navigation menu, go to APIs & Services -> Credentials
4. Create credentials -> OAuth client ID
5. Follow steps and copy google client ID into both the .env & <GoogleLogin /> component

## Start the server (dev)
To start the server in dev mode run: `npm run server-dev`

## Start the client (dev)
To start the client in dev mode, open a new terminal window, change directory into /client and run: `npm start`

## Start the database
1. Make sure mongodb is installed on your computer
2. You may need to run `mongod` in a terminal window to start the local database

## Test Graph QL Queries
Navigate to `http://localhost:5000/graphql` to play around with your API and make test queries.  Note `5000` should be replaced with the port you set in the .env file.

