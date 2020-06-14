import React, { FC } from 'react';
import './Card.css';

export const Card: FC = ({ children }) => (
  <div className="ui card" style={{ width: 500 }}>
    {children}
  </div>
);

export const CardSection: FC<{ disabled?: boolean }> = ({
  children,
  disabled,
}) => (
  <div className={`content ${disabled ? 'disabled-section' : ''}`}>
    {children}
  </div>
);
