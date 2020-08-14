import React from 'react';
import { Table } from 'reactstrap';

type Game = {
  gameId: string,
  passingAttemptsAmt: number,
  passingCompletionsAmt: number,
  seasonYear: number
}

type Player = {
  demographicData: {
    playerAbbr: string,
    firstName: string,
    lastName: string
  };
  playerGames: Game[];
}

type PlayerViewerProps = {
  player: Player
}

export default ({ player }: PlayerViewerProps) => (
  <Table>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Game ID</th>
        <th>Season</th>
        <th>Passing Attempts</th>
        <th>Passing Completions</th>
        <th>Passing Percentage</th>
      </tr>
    </thead>
    <tbody>
    {player.playerGames.map((playerGame: Game) => (
      <tr key={playerGame.gameId}>
          <td>{player.demographicData.firstName}</td>
          <td>{player.demographicData.lastName}</td>
          <td>{playerGame.gameId}</td>
          <td>{playerGame.seasonYear}</td>
          <td>{playerGame.passingAttemptsAmt}</td>
          <td>{playerGame.passingCompletionsAmt}</td>
          <td>{playerGame.passingCompletionsAmt / playerGame.passingAttemptsAmt}</td>
        </tr>
    ))}
    </tbody>
  </Table>
)
