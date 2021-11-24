import React, { useState } from 'react';
import FocusLock from 'react-focus-lock';
import DOMPurify from 'dompurify';
import { AiOutlineClose } from 'react-icons/ai';
import { NewCard } from '../domain/Card';
import { CircleButton } from './buttons/CircleButton';
import './AddNewCardModal.css';
import { Button } from './buttons/Button';
import { ColumnType } from '../domain/Board';

interface Props {
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSend: (card: NewCard) => void;
}

export const AddNewCardModal = ({
  onClose,
  onSend
}: Props) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onChangeTitle = (event: any) => {
    setTitle(event.target.value)
  }

  const onChangeContent = (event: any) => {
    setContent(DOMPurify.sanitize(event.target.value))
  }

  const onSubmitCard = () => {
    onSend({
      conteudo: content, lista: ColumnType.TODO, titulo: title
    })
  }

  return (
    <FocusLock>
      <div
        role="dialog"
        className="add-new-card-modal-container"
        aria-modal="true"
      >
        <div className="modal__inner">
          <div className="close-container">
            <CircleButton
              label={<AiOutlineClose />}
              onClick={onClose}
              extraClass="close-modal"
              ariaLabel="Fechar"
            />
          </div>
          <form className="new-card-form">
            <div className="field-container">
              <label htmlFor="new-card-title">Título:</label>
              <input
                type="text"
                id="new-card-title"
                name="title"
                value={title}
                onChange={onChangeTitle}
              />
            </div>
            <div className="field-container">
              <label htmlFor="new-card-content">Conteúdo:</label>
              <textarea
                id="new-card-content"
                name="content"
                rows={4}
                value={content}
                onChange={onChangeContent}
              />
            </div>
            <div className="button-container">
              <Button
                onClick={onSubmitCard}
                label="Salvar"
                type="submit"
                extraClass="submit-form-button"
                ariaLabel="Salvar"
              />
            </div>
          </form>
        </div>
      </div>
    </FocusLock>
  )
}
