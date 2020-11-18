import React, { ChangeEvent, CSSProperties, FunctionComponent } from 'react';
import styles from './TextInput.module.css';

export type TextInputProps = {
  value: string,
  placeholder: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  properties?: CSSProperties
}

const TextInput: FunctionComponent<TextInputProps> = ({
  value,
  placeholder,
  onChange,
  properties
}) => {
  return (
    <input 
      type='text' 
      className={styles['text-input']} 
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={properties}
    />
  );
}

export default TextInput;