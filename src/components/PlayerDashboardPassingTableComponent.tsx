import React, { useState } from 'react';
import { Table, Collapse } from 'reactstrap';
import { Player } from '../types/PlayerDashboardTypes';
import { QuarterbackGame } from '../types/QuarterbackDashboardTypes';
import styles from './PlayerDashboardPassingTableComponent.module.css';

type PlayerDashboardPassingTableProps = {
  player: Player
}

export default ({ player }: PlayerDashboardPassingTableProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <h1 className={styles.title} onClick={toggle}>Game Stats</h1>
      <Collapse isOpen={isOpen}>
        <Table striped className={styles.table}>
          <thead>
            <tr>
              <th>Game ID</th>
              <th>Season</th>
              <th>Passing Attempts</th>
              <th>Passing Completions</th>
              <th>Passing Percentage</th>
            </tr>
          </thead>
          <tbody>
          {player.playerGames.map((game: QuarterbackGame) => (
            <tr key={game.gameId}>
              <td>{game.gameId}</td>
              <td>{game.seasonYear}</td>
              <td>{game.passingAttemptsAmt}</td>
              <td>{game.passingCompletionsAmt}</td>
              <td>{(100 * game.passingCompletionsAmt / game.passingAttemptsAmt).toFixed(3)}%</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Collapse>
    </div>
  );
}
