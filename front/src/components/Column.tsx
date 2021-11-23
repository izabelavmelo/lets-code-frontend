import React from 'react';
import './Column.css';
import { ColumnType } from '../domain/Board';

interface Props {
  type: ColumnType;
}

export default function Column({
  type
}: Props) {
  return (
    <div className="column-container">
      <h2 className="column-title">{type}</h2>
      <p>Em construção ...</p>
    </div>
  );
}
