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
      author {
        id
        name
        age
      }
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
            <div className="items">
              <Query query={POSTS_QUERY}>
                {({loading, data}) => {
                  if(loading) return 'Loading...';
                  const {getBooks} = data;
                  return getBooks.map(book => {
                    return (
                      <div key={book.id} className='books'>
                        <div className='book-title'>
                          <h2>{book.name}</h2>
                          <p>{book.genre}</p>
                        </div>
                        <div className='book-author'>
                          <h3>- {book.author.name}</h3>
                          <p>{book.author.age} years old</p>
                        </div>
                      </div>
                    )
                  })
                }}
              </Query>
            </div>
          </header>

        </div>
        <style>{`
          .books {
            line-height: 8px;
          }
          .book-title {
            display: flex;
            align-items: flex-end;
          }
          .book-title h2 {
            font-weight: 500;
            font-size: 22px;
            font-style: oblique;
            padding-right: 10px;
            color: #47d9f8;
          }
          .book-title p {
            font-weight: 300;
            font-size: 12px;
            padding-right: 10px;
            padding-bottom: 3px;
          }
          .book-author {
            display: flex;
            align-items: flex-end;
          }
          .book-author h3 {
            font-weight: 500;
            font-size: 16px;
            font-style: oblique;
            padding-right: 10px;
            margin-left: 20px;
          }
          .book-author p {
            font-weight: 300;
            font-size: 12px;
            padding-right: 10px;
            padding-bottom: 3px;
          }
        `}</style>
      </ApolloProvider>
    );
  }
}

export default App;
