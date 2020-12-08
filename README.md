# fullstack-boilerplate
This is a monolithic boilerplate repo for kickstarting fullstack applications for fellow coder(wo)manz.  The boilerplate code sets up a authentication API using google login OAuth2 with users saved to a Mongo database.  It exposes an Apollo graphQL server for querying and mutating data. This repo also sets up a simple front-end which includes persisent login with google, protected routes, and login / logout auth token management.

## Backend boilerplate
- Node server with Express to simplify server and serve static frontend build files
- REST endpoint for authentication `/auth/googleLogin`, this listens for requests from frontend with google `tokenId`, and uses Google's OAuth2Client `google-auth-library` to verify the token, create a user in the mongo database, sign a `jsonwebtoken` using the users ID, and respond with that `jsonwebtoken` and basic google profile data to the frontend.
- Express middleware to verify all `/graphql` API requests have valid `Authorization: Bearer [token]`
- GraphQL using Apollo server on `/graphql` endpoint for exposing data
- Mongo database set up with `User` model

## Frontend
- `create-react-app` boilerplate code
- `react-router-dom` set up with `/login`, `/profile`, and `/`
- `PrivateRoute` wrapper which requires user to be logged in to access route, otherwise redirectes to `/login`
- `react-google-login` components for Login / Logout functionality via Google OAuth2
- `auth.js` service to build auth context using React hooks, handle local storage control of auth token, get authentication status, and basic user details


## Create .env file at the root of the repository with the following fields
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

## Start everything with concurrently
You can also run `npm run dev` to start the server, the client, and the database all in the same terminal window.

## Test Graph QL Queries
Navigate to `http://localhost:5000/graphql` to play around with your API and make test queries.  

*Note `5000` should be replaced with the port you set in the .env file.  Also, because the API is protected by authentication middleware, you won't be able to access the graphql playground unless your requests contain a valid valid `Authorization: Bearer [token]`.  To get a valid token, you can log the token returned from the `/auth/googleLogin` API call on the frontend.  I recommend using the [Mod Header](https://bewisse.com/modheader/help/) chrome extension to attach the bearer token to the playground.

