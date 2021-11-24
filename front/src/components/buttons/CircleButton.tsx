import React from 'react';
import './CircleButton.css';

interface Props {
  label: string | React.ReactElement;
  onClick: () => void;
  extraClass?: string;
  disabled?: boolean;
  ariaLabel: string;
  type?: 'button' | 'submit' | 'reset';
}

export const CircleButton = ({
  label,
  onClick,
  extraClass,
  disabled,
  ariaLabel,
  type = 'button'
}: Props) => (
  <button
    onClick={onClick}
    className={`circle-button ${extraClass} ${disabled ? 'disabled' : ''}`}
    disabled={disabled}
    aria-label={ariaLabel}
    type={type}
  >
    {label}
  </button>
)
