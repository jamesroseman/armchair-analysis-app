import ApolloClient from 'apollo-boost';

// Disable caching of responses
// https://github.com/apollographql/apollo-client/issues/3234
// apollo-boost clients don't include defaultOptions
// https://github.com/apollographql/apollo-client/issues/3900
const client = new ApolloClient({
  // todo(jamesroseman): This should for sure be an ENV_VAR or something.
  uri: " http://192.168.0.42:4000/graphql",
});
// client.defaultOptions = {
//   watchQuery: {
//     fetchPolicy: 'no-cache',
//     errorPolicy: 'all',
//   },
//   query: {
//     fetchPolicy: 'no-cache'
//   }
// };

export default client;