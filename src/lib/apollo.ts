import ApolloClient from 'apollo-boost';

export default new ApolloClient({
  // todo(jamesroseman): This should for sure be an ENV_VAR or something.
  uri: " http://192.168.0.42:4000/graphql",
});
