import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { SeasonSelection } from '../types/PlayerDashboardTypes';

type SeasonSelectorComponentProps = {
  onStateChange: (value: SeasonSelection) => any,
}

export default({ onStateChange }: SeasonSelectorComponentProps) => {
  const [value, setValue] = useState<SeasonSelection>(SeasonSelection.Lifetime);

  const changeSelection = (newValue: SeasonSelection) => {
    onStateChange(newValue);
    setValue(newValue);
  }

  return (
    <ButtonGroup>
      <Button onClick={() => changeSelection(SeasonSelection.One)} active={value === SeasonSelection.One}>One</Button>
      <Button onClick={() => changeSelection(SeasonSelection.Three)} active={value === SeasonSelection.Three}>Three</Button>
      <Button onClick={() => changeSelection(SeasonSelection.Lifetime)} active={value === SeasonSelection.Lifetime}>Lifetime</Button>
    </ButtonGroup>
  )
}
