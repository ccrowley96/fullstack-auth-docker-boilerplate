const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');
const { connectDB, User } = require('./db/index');
const morgan = require('morgan');
const authApi = require('./routes/auth');
const { authenticateToken } = require('./middleware/authJwt');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const Users = require('./graphql/datasources/user');
const { ApolloServer } = require('apollo-server-express');
const ObjectId = require('mongoose').Types.ObjectId;

const app = express();
const port = process.env.PORT || 5000;

// Connect to mongo database
connectDB();

// Log all server-dev requests with morgan
if(process.env.NODE_ENV === 'dev'){
  app.use(morgan('dev'))
}

// Enable Cross Origin Requests with CORS
app.use(cors({credentials: true, origin: true}));

// Use JSON
app.use(express.json());

// HTTPS Redirect for production
if (process.env.NODE_ENV !== 'dev') {
  app.enable('trust proxy');
  app.use((req, res, next) => {
      if (req.secure) {
          next();
      } else {
          res.redirect('https://' + req.headers.host + req.url);
      }
  });
}

// Auth API used for login/sign-up
app.use('/auth', authApi);

// Verify JWT Token (Authenticate request)
app.use(authenticateToken)

// Set up Apollo context
const context = async({req}) => {
  let user = await User.findById(new ObjectId(req.userId));
  if(user){
    return {user}
  }
  return {user: null};
}

// Initialize Graph QL Apollo server
const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => {
    users: new Users(User)
  }, 
  formatError: (err) => {
    console.error(err);
    return err;
  },
  context
});

server.applyMiddleware({ app });

// Serve static client build files
app.use(express.static(path.join(__dirname, '../client/build')));

//Default catch all -> to index.html (for react-router)
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

//Start Listening
app.listen(port, () => {
    console.log(`Graph QL server running on port: ${port}!`);
  }
);