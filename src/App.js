import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: 'https://api-euwest.graphcms.com/v1/cjq521kub8sha01b0qi9v1axb/master'
});

// a way to fetch data outside React methods
const POSTS_QUERY = gql`
  {
    posts {
      id
      title
      body
    }
  }
`;

client.query({
  query: POSTS_QUERY
}).then(res => console.log(res))

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
                const {posts} = data;
                return posts.map(post => {
                  return (
                    <div key={post.id} className='posts'>
                      <h2>{post.title}</h2>
                      <p>{post.body}</p>
                    </div>
                  )
                })
              }}
            </Query>
          </header>

        </div>
        <style>{`
          .posts h2 {
            font-weight: 500;
            font-size: 22px;
            font-style: oblique;
          }
          .posts p {
            font-weight: 300;
            font-size: 18px;
          }
        `}</style>
      </ApolloProvider>
    );
  }
}

export default App;
