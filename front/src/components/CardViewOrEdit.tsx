import React, { useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillDelete,
  AiTwotoneEdit,
  AiTwotoneSave
} from 'react-icons/ai';
import { BiBlock } from 'react-icons/bi';
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
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(card.titulo)
  const [content, setContent] = useState(card.conteudo)

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

  const changeToEditingMode = () => {
    setIsEditing(true)
  }

  const onUpdate = () => {
    setIsEditing(false)
    onUpdateCard({ ...card, titulo: title, conteudo: content })
  }

  const onChangeTitle = (event: any) => {
    setTitle(event.target.value)
  }

  const onChangeContent = (event: any) => {
    setContent(DOMPurify.sanitize(event.target.value))
  }

  const onClear = () => {
    setTitle(card.titulo)
    setContent(card.conteudo)
    setIsEditing(false)
  }

  const html = marked.parse(DOMPurify.sanitize(card.conteudo));

  return (
    <div className="card-container">
      <div className="card-header">
        {isEditing ? (
          <input
            type="text"
            id="new-card-title"
            name="title"
            value={title}
            onChange={onChangeTitle}
          />
        ) : (
          <>
            <h3 className="card-title">{card.titulo}</h3>
            <CircleButton label={<AiTwotoneEdit />} onClick={changeToEditingMode} ariaLabel="Editar card" />
          </>
        )}
      </div>
      {isEditing ? (
        <textarea
          id="edit-card-content"
          name="content"
          rows={7}
          value={content}
          onChange={onChangeContent}
        />
      ) : (
        <div className="card-content" dangerouslySetInnerHTML={{ __html: html }} />
      )}
      <div className="buttons-container-outer">
        <div className="buttons-container">
          {isEditing ? (
            <>
              <CircleButton
                label={<BiBlock />}
                onClick={onClear}
                ariaLabel="Cancelar edição"
              />
              <CircleButton
                label={<AiTwotoneSave />}
                onClick={onUpdate}
                ariaLabel="Salvar edição"
              />
            </>
          ) : (
            <>
              <CircleButton
                label={<AiFillCaretLeft />}
                onClick={moveToLeft}
                disabled={card.lista === ColumnType.TODO}
                ariaLabel="Mover para esquerda"
              />
              <CircleButton
                label={<AiFillDelete />}
                onClick={onRemoveCardAction}
                ariaLabel="Apagar card"
              />
              <CircleButton
                label={<AiFillCaretRight />}
                onClick={moveToRight}
                disabled={card.lista === ColumnType.DONE}
                ariaLabel="Mover para direita"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
