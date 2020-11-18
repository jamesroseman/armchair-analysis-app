import React, { ChangeEvent, CSSProperties, FunctionComponent } from 'react';
import styles from './SliderInput.module.css';

export type SliderInputProps = {
  min: number,
  max: number,
  value: number,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  properties?: CSSProperties
}

const SliderInput: FunctionComponent<SliderInputProps> = ({
  min,
  max,
  value,
  onChange,
  properties
}) => {
  return (
    <input 
      className={styles['slider-input']}
      type="range" 
      min={min} 
      max={max} 
      value={value} 
      onChange={onChange} 
      style={properties}
    />
  );
}

export default SliderInput;