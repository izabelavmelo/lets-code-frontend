import React from 'react';
import './CircleButton.css';

interface Props {
  label: string | React.ReactElement;
  onClick: () => void;
  extraClass?: string;
  disabled?: boolean;
}

export const CircleButton = ({
  label,
  onClick,
  extraClass,
  disabled
}: Props) => (
  <button
    onClick={onClick}
    className={`circle-button ${extraClass} ${disabled ? 'disabled' : ''}`}
    disabled={disabled}
  >
    {label}
  </button>
)
