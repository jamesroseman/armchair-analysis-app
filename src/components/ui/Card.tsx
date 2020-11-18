import React, { CSSProperties, FunctionComponent } from 'react';
import styles from './Card.module.css';

export type CardProps = {
  title?: string,
  properties?: CSSProperties,
  bodyProperties?: CSSProperties
}

const Card: FunctionComponent<CardProps> = ({ 
  title, 
  properties, 
  children,
  bodyProperties
}) => {
  return (
    <div className={styles['card-root']} style={properties}>
      {renderTitle(title)}
      <div className={styles['card-body']} style={bodyProperties}>
        {children}
      </div>
    </div>
  );
}

function renderTitle(title?: string) {
  if (title) {
    return <div className={styles['card-title']}>{title}</div>
  }
  return <></>
}

export default Card;