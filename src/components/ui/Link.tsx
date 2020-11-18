import React, { CSSProperties, FunctionComponent } from 'react';

export enum LinkTargetType {
  Blank = 1,
  Self,
  Parent,
  Top
}

export type LinkProps = {
  href: string,
  targetType?: LinkTargetType,
  properties?: CSSProperties
}

const Link: FunctionComponent<LinkProps> = ({ 
  children,
  href,
  targetType = LinkTargetType.Blank,
  properties
}) => {
  const linkProperties: CSSProperties = {
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
    ...properties
  }
  return (
    <a 
      href={href} 
      target={getTargetFromType(targetType)} 
      style={linkProperties}
    >
      {children}
    </a>
  );
}
export default Link;

function getTargetFromType(type: LinkTargetType) {
  if (type === LinkTargetType.Blank) {
    return '_blank';
  }
  if (type === LinkTargetType.Parent) {
    return '_parent';
  }
  if (type === LinkTargetType.Self) {
    return '_self';
  }
  if (type === LinkTargetType.Top) {
    return '_top';
  }
  return '_blank';
}