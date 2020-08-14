import React from 'react';

import PlayerDashboardRenderer from '../renderers/PlayerDashboardRenderer';

type PlayerDashboardContainerProps = {
  playerAbbr: string
}

export default (props: PlayerDashboardContainerProps) => (
  <PlayerDashboardRenderer playerAbbr={props.playerAbbr} />
)
