import React from 'react';
import FocusLock from 'react-focus-lock';
import { Card } from '../domain/Card';
import { CircleButton } from './buttons/CircleButton';
import './AddNewCardModal.css';
import { Button } from './buttons/Button';

interface Props {
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSend: (card: Card) => void;
}

export const AddNewCardModal = ({
  onClose,
  onSend
}: Props) => (
  <FocusLock>
    <div
      role="dialog"
      className="add-new-card-modal-container"
      aria-modal="true"
    >
      <div className="modal__inner">
        <div className="close-container">
          <CircleButton label="x" onClick={onClose} extraClass="close-modal" />
        </div>
        <form className="new-card-form">
          <div className="field-container">
            <label htmlFor="new-card-title">Título:</label>
            <input type="text" id="new-card-title" name="title" />
          </div>
          <div className="field-container">
            <label htmlFor="new-card-content">Conteúdo:</label>
            <textarea id="new-card-content" name="content" rows={4} />
          </div>
          <Button
            onClick={() => onSend({
              id: '123', conteudo: 'oi', lista: 'ToDo', titulo: 'ola'
            })}
            label="Enviar"
            type="submit"
            extraClass="submit-form-button"
          />
        </form>
      </div>
    </div>
  </FocusLock>
)
