import React from 'react';
import { TeamName } from '../types/ModelConstantTypes';
import { TeamNameUtils } from '../utils/TeamNameUtils';

type TeamLogoImageComponentProps = {
  teamName: TeamName,
  width?: number,
  height?: number
}

export default ({ teamName, width, height }: TeamLogoImageComponentProps) => {
  return (
    <img width={width} height={height} alt={`${teamName} Logo`} src={TeamNameUtils.getImageSrcFromTeamName(teamName)} />
  );
}
