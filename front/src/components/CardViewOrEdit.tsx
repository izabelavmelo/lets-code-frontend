import React from 'react';
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillDelete,
  AiTwotoneEdit
} from 'react-icons/ai';
import './CardViewOrEdit.css';
import { Card } from '../domain/Card';
import { CircleButton } from './buttons/CircleButton';
import { ColumnType } from '../domain/Board';

interface Props {
  card: Card;
  // eslint-disable-next-line no-unused-vars
  onRemoveCard: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  onUpdateCard: (newCard: Card) => void;
}

export default function CardViewOrEdit({
  card,
  onRemoveCard,
  onUpdateCard
}: Props) {
  const onRemoveCardAction = () => {
    onRemoveCard(card.id)
  }
  const moveToLeft = () => {
    if (card.lista === ColumnType.DOING) {
      onUpdateCard({ ...card, lista: ColumnType.TODO })
    } else if (card.lista === ColumnType.DONE) {
      onUpdateCard({ ...card, lista: ColumnType.DOING })
    }
  }

  const moveToRight = () => {
    if (card.lista === ColumnType.TODO) {
      onUpdateCard({ ...card, lista: ColumnType.DOING })
    } else if (card.lista === ColumnType.DOING) {
      onUpdateCard({ ...card, lista: ColumnType.DONE })
    }
  }

  return (
    <div className="card-container">
      <div className="card-header">
        <h3 className="card-title">{card.titulo}</h3>
        <CircleButton label={<AiTwotoneEdit />} onClick={() => null} />
      </div>
      <p className="card-content">{card.conteudo}</p>
      <div className="buttons-container-outer">
        <div className="buttons-container">
          <CircleButton
            label={<AiFillCaretLeft />}
            onClick={moveToLeft}
            disabled={card.lista === ColumnType.TODO}
          />
          <CircleButton
            label={<AiFillDelete />}
            onClick={onRemoveCardAction}
          />
          <CircleButton
            label={<AiFillCaretRight />}
            onClick={moveToRight}
            disabled={card.lista === ColumnType.DONE}
          />
        </div>
      </div>
    </div>
  );
}
