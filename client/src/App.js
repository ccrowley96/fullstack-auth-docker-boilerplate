import React from "react";
import { ProvideAuth } from './services/auth';
import Routes from './components/Routes/Routes';
import { ApolloProvider, createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.scss';

export default function App() {
  return (
    <ProvideAuth>
      <ApolloProvider client={client}>
        <div className="app">
          <Routes/>
        </div>
      </ApolloProvider>
    </ProvideAuth>
  );
}

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token = null;
  let sessionString = localStorage.getItem('session');
  if(sessionString){
    let session = JSON.parse(sessionString);
    if(session.token){
      token = session.token;
    }
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})