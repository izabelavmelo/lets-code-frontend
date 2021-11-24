import React from 'react';
import './Column.css';
import { ColumnType } from '../domain/Board';
import { Card } from '../domain/Card';
import CardViewOrEdit from './CardViewOrEdit';

interface Props {
  type: ColumnType;
  cards: Card[];
  // eslint-disable-next-line no-unused-vars
  onRemoveCard: (id: string) => void;
}

export default function Column({
  type,
  cards,
  onRemoveCard
}: Props) {
  return (
    <div className="column-container">
      <h2 className="column-title">{type}</h2>
      {cards.map((card) => (
        <CardViewOrEdit
          card={card}
          onRemoveCard={onRemoveCard}
        />
      ))}
    </div>
  );
}
