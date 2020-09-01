import gql from 'graphql-tag';

export default gql`
  query GetPlayer($playerAbbr:String!){
    dashPlayer(playerAbbr: $playerAbbr) {
      demographicData {
        playerAbbr,
        firstName,
        lastName,
        primaryPosition
      },
      playerGames {
        gameId,
        passingAttemptsAmt,
        passingCompletionsAmt,
        passingTouchdownsAmt,
        passingYardageAmt,
        seasonYear,
        fantasyPoints
      }
    }
  }
`;
