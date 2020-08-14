import React, { useState } from 'react';
import { InputGroup, Input } from 'reactstrap';

import PlayerSelectorRenderer from '../renderers/PlayerSelectorRenderer';

const PlayerSelectorContainer = () => {
  const [textAreaValue, setTextAreaValue] = useState<string>("Search for player by name.");
  return (
    <div>
      <InputGroup>
        <Input onChange={(event) => {
          setTextAreaValue(event.target.value)
        }}/>
      </InputGroup>
      <PlayerSelectorRenderer lastName={textAreaValue} />
    </div>
  );
}

export default PlayerSelectorContainer;
