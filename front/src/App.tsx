import React, { useEffect, useMemo, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import logo from './assets/logo.png';
import './App.css';
import ApiBoardService from './services/ApiBoardService';
import Column from './components/Column';
import { ColumnType } from './domain/Board';
import { Loader } from './components/Loader';
import { Card, NewCard } from './domain/Card';
import { CircleButton } from './components/buttons/CircleButton';
import { AddNewCardModal } from './components/AddNewCardModal';

function App() {
  const apiBoardService = new ApiBoardService()
  const [token, setToken] = useState<string>()
  const [cards, setCards] = useState<Card[]>()
  const [showAddNewCardModal, setShowAddNewCardModal] = useState(false)
  useEffect(() => {
    apiBoardService.login('letscode', 'lets@123').then((response) => {
      setToken(response.token.replaceAll('"', ''))
    })
  }, [])

  useEffect(() => {
    if (token) {
      apiBoardService.getCards(token).then((response) => {
        setCards(response.cards)
      })
    }
  }, [token])

  const onShowAddNewCardModal = () => {
    setShowAddNewCardModal(true)
  }

  const onHideAddNewCardModal = () => {
    setShowAddNewCardModal(false)
  }

  const onSendNewCard = (card: NewCard) => {
    if (token) {
      apiBoardService.addNewCard(token, card)
    }
  }

  const onRemoveCard = (id: string) => {
    if (token) {
      apiBoardService.removeCard(token, id).then((response) => {
        setCards(response.cards)
      })
    }
  }

  const onUpdateCard = (newCard: Card) => {
    if (token) {
      apiBoardService.updateCard(token, newCard).then((response) => {
        const index = cards?.findIndex((card) => card.id === response.card.id)
        if (index !== undefined && index !== -1 && index !== null) {
          const newCards = [...(cards || [])]
          newCards[index] = response.card
          setCards([...(newCards || [])])
        }
      })
    }
  }

  const memoizedCardsTodo = useMemo(
    () => (cards || []).filter((card) => card.lista === ColumnType.TODO),
    [cards]
  )

  const memoizedCardsDoing = useMemo(
    () => (cards || []).filter((card) => card.lista === ColumnType.DOING),
    [cards]
  )

  const memoizedCardsDone = useMemo(
    () => (cards || []).filter((card) => card.lista === ColumnType.DONE),
    [cards]
  )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="header-text">
          Quadro Kanban - Lets Code
        </p>
      </header>
      <div className="App-body">
        {token && cards ? (
          <>
            <Column
              key={ColumnType.TODO}
              type={ColumnType.TODO}
              cards={memoizedCardsTodo}
              onRemoveCard={onRemoveCard}
              onUpdateCard={onUpdateCard}
              extraButton={(
                <CircleButton
                  extraClass="close-modal"
                  label={<BsPlusLg />}
                  onClick={onShowAddNewCardModal}
                  ariaLabel="Adicionar novo card"
                />
              )}
            />
            <Column
              key={ColumnType.DOING}
              type={ColumnType.DOING}
              cards={memoizedCardsDoing}
              onRemoveCard={onRemoveCard}
              onUpdateCard={onUpdateCard}
            />
            <Column
              key={ColumnType.DONE}
              type={ColumnType.DONE}
              cards={memoizedCardsDone}
              onRemoveCard={onRemoveCard}
              onUpdateCard={onUpdateCard}
            />
          </>
        ) : (
          <Loader />
        )}
        {showAddNewCardModal && (
          <AddNewCardModal onClose={onHideAddNewCardModal} onSend={onSendNewCard} />
        )}
      </div>
    </div>
  );
}

export default App;
