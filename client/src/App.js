import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/Notfound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SingleStory from './pages/SingleStory';

import Header from './components/Header';
import Footer from './components/Footer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header/>
          <Routes>
            <Route 
              path="/" 
              element={<Home />}
            />
            <Route 
              path="/profile" 
              element={<Profile/>}
            />
            <Route 
              path="/login" 
              element={<Login/>}
            />
            <Route 
              path="/signup" 
              element={<Signup/>}
            />
            <Route 
              path="*"
              element={<NotFound />}
            />
            <Route
              path="/profiles/:username"
              element={<Profile />}
            />
            <Route
              path="/stories/:storyId"
              element={<SingleStory />}
            />
          </Routes>
        <Footer/>
      </Router>
    </ApolloProvider>
  );
}

export default App;
