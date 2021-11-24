import React from 'react';
import './Button.css';

interface Props {
  label: string;
  onClick: () => void;
  extraClass?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel: string;
}

export const Button = ({
  label,
  onClick,
  extraClass,
  disabled,
  type = 'button',
  ariaLabel
}: Props) => (
  <button
    onClick={onClick}
    className={`button ${extraClass} ${disabled ? 'disabled' : ''}`}
    disabled={disabled}
    type={type}
    aria-label={ariaLabel}
  >
    {label}
  </button>
)
