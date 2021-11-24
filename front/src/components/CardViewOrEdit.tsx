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
}

export default function CardViewOrEdit({
  card,
  onRemoveCard
}: Props) {
  const onRemoveCardAction = () => {
    onRemoveCard(card.id)
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
            onClick={() => null}
            disabled={card.lista === ColumnType.TODO}
          />
          <CircleButton
            label={<AiFillDelete />}
            onClick={onRemoveCardAction}
          />
          <CircleButton
            label={<AiFillCaretRight />}
            onClick={() => null}
            disabled={card.lista === ColumnType.DONE}
          />
        </div>
      </div>
    </div>
  );
}
