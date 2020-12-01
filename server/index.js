const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const port = process.env.PORT;

// Enable Cross Origin Requests with CORS
app.use(cors({credentials: true, origin: true}));

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

// Graph QL
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Query {
        quoteOfTheDay: String
        random: Float!
        rollDice(numDice: Int!, numSides: Int): [Int]
    }
`);

// The root provides a resolver function for each API endpoint
const root = {
    quoteOfTheDay: () => {
        return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random: () => {
        return Math.random();
    },
    rollDice: ({numDice, numSides}) => {
        let output = [];
        for (let i = 0; i < numDice; i++) {
          output.push(1 + Math.floor(Math.random() * (numSides || 6)));
        }
        return output;
      }
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

// Static Files
app.use(express.static(path.join(__dirname, '../client/build')));

//Default catch all -> to index.html
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