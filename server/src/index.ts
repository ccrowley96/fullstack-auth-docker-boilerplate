import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import path from 'path';
import { connectDB, User } from './db/index';
import morgan from 'morgan';
import authApi from './routes/auth';
import jwt from 'jsonwebtoken';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import Users from './graphql/datasources/user';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import mongoose from 'mongoose';

dotenv.config();

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
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (req.secure) {
          next();
      } else {
          res.redirect('https://' + req.headers.host + req.url);
      }
  });
}

// Serve static client build files
app.use(express.static(path.join(__dirname, '../../client/build')));

// Auth API used for login/sign-up
app.use('/auth', authApi);

// Use Apollo context to verify authentication token
const context = async({req, res}) => {
  const token = req?.headers?.authorization?.replace('Bearer ', '');
  if(!token) {
      throw new AuthenticationError('No authorization token provided!');
  }
  try{
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = user._id;
  } catch(err){
    throw new AuthenticationError('API access unauthorized!');
  }

  const user = await User.findById(new mongoose.Types.ObjectId(req.userId));

  if(user){
    return { user }
  } else{
    throw new AuthenticationError('User not found');
  }
}

// Initialize Graph QL Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    users: new Users(User)
  }),
  context
});

server.applyMiddleware({ app });

// Default catch all -> to index.html (for react-router)
app.get('/*', (_, res: express.Response) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// Start Listening
app.listen(port, () => {
    console.log(`Graph QL server running on port: ${port}!`);
  }
);