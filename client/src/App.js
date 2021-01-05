import React from "react";
import { ProvideAuth } from './hooks/auth';
import Routes from './components/Routes/Routes';
import { ApolloProvider, createHttpLink, ApolloClient, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ProvideTheme } from "./hooks/provideTheme";
import { ProvideAppState } from './hooks/provideAppState';
import { cache } from './cache';

// The classnames/bind dependency ensures scss modules are scoped at the component level 
// This means only this component can access styles in the App.module.scss file.
import classNames from 'classnames/bind';
const cx = classNames.bind(require('./App.module.scss'));

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ProvideAuth>
        <ProvideTheme>
          <ProvideAppState>
            <div className={cx('app')}>
              <Routes/>
            </div>
          </ProvideAppState>
        </ProvideTheme>
      </ProvideAuth>
    </ApolloProvider>
  );
}

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Use this function to globally handle graphQL errors
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, extensions: { code }}) => {
      console.log(`[GraphQL error]:`, {message, code})
       
      // Redirect to login if session invalid
      if(code === 'UNAUTHENTICATED'){
        localStorage.removeItem('session');
        window.location = '/login';
      }

    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
})

// Attach auth token to outgoing GraphQL requests
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
  link: from([
    authLink,
    errorLink,
    httpLink
  ]),
  cache
})