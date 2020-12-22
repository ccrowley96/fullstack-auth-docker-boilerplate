# fullstack-auth-docker-boilerplate
This is a monolithic, containerized, boilerplate repo for kickstarting fullstack applications.  The boilerplate code sets up an authentication API using google login OAuth2 with users saved to a Mongo database.  It exposes an Apollo graphQL server for querying and mutating data. This repo also sets up a simple front-end which includes persistent login with google, protected routes, and login / logout auth token management.

The client, server, and database are then containerized using the `docker-compose.yml` file.  Once you've installed [docker](https://www.docker.com/products/docker-desktop), you can spin up the the development environment with two simple commands.

1. `docker-compose build`
2. `docker-compose up`
3. (when you've finished) `docker-compose down`

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

# Set up development environment
## Create .env file in the `/server` folder of the repository with the following fields.
*Note, it is import that the .env is placed in `/server` as that's where the docker context searches for environment variables when starting the server.


|Key | Value|
|-------- | -----|
|PORT | `5000`|
|DB_USER | `username`|
|DB_PASSWORD | `password`|
|GOOGLE_CLIENT_ID | client ID from console.cloud.google.com|
|JWT_SECRET | any string that is complex and not easy to guess / brute force |

## Install Docker desktop
1. Navigate to [here](https://www.docker.com/products/docker-desktop), download and install docker desktop

## Set up Google OAuth Credentials
1. Navigate to console.cloud.google.com
2. Create new project
3. In navigation menu, go to APIs & Services -> Credentials
4. Create credentials -> OAuth client ID
5. Follow steps and copy google client ID into both the .env & <GoogleLogin /> component

## Build docker images
1. Navigate to the root project directory (where docker-compose.yml is located)
2. Once docker-desktop is installed, run `docker-compose build`.  This will build the the following images for your app
    - lightweight mongo database server (port 27017 by default)
    - lightweight node server for API and graphql (port 5000 by default)
    - lightweight node server for serving create-react-app client build (port 3000 by default)

## Start / stop docker containers
1. To start, run `docker-compose up`
2. To stop, run `docker-compose down`

## Test Graph QL Queries
Once containers are running, navigate to `http://localhost:5000/graphql` to play around with your API and make test queries.  

*Note `5000` should be replaced with the port you set in the .env file.  Also, because the API is protected by authentication middleware, you won't be able to access the graphql playground unless your requests contain a valid valid `Authorization: Bearer [token]`.  To get a valid token, you can log the token returned from the `/auth/googleLogin` API call on the frontend.  I recommend using the [Mod Header](https://bewisse.com/modheader/help/) chrome extension to attach the bearer token to the playground.
