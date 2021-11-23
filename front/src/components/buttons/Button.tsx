import React from 'react';
import './Button.css';

interface Props {
  label: string;
  onClick: () => void;
  extraClass?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  label,
  onClick,
  extraClass,
  disabled,
  type = 'button'
}: Props) => (
  <button
    onClick={onClick}
    className={`button ${extraClass} ${disabled ? 'disabled' : ''}`}
    disabled={disabled}
    type={type}
  >
    {label}
  </button>
)
