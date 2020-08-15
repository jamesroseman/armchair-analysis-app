import gql from 'graphql-tag';

export default gql`
  query GetPlayerAbbrFromName($lastName: String){
    dashPlayerTypeahead(lastName: $lastName) {
      firstName,
      lastName,
      playerAbbr
    }
  }
`;
