import ApolloClient from 'apollo-boost';

export default new ApolloClient({
  // todo(jamesroseman): This should for sure be an ENV_VAR or something.
  uri: "http://localhost:4000/graphql",
});
