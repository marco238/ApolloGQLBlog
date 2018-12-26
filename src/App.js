import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

// a way to fetch data outside React methods
const POSTS_QUERY = gql`
  {
    getBooks {
      id
      name
      genre
    }
  }
`;

// client.query({
//   query: POSTS_QUERY
// }).then(res => console.log(res))

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              React <code>*ApolloGQL*</code> Blog
            </p>
            <Query query={POSTS_QUERY}>
              {({loading, data}) => {
                if(loading) return 'Loading...';
                const {getBooks} = data;
                return getBooks.map(book => {
                  return (
                    <div key={book.id} className='books'>
                      <h2>{book.name}</h2>
                      <p>{book.genre}</p>
                    </div>
                  )
                })
              }}
            </Query>
          </header>

        </div>
        <style>{`
          .books h2 {
            font-weight: 500;
            font-size: 22px;
            font-style: oblique;
          }
          .books p {
            font-weight: 300;
            font-size: 18px;
          }
        `}</style>
      </ApolloProvider>
    );
  }
}

export default App;
