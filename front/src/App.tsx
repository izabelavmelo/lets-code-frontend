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
        <CircleButton label={<BsPlusLg />} onClick={onShowAddNewCardModal} />
      </header>
      <body>
        <div className="App-body">
          {token && cards ? (
            <>
              <Column
                type={ColumnType.TODO}
                cards={memoizedCardsTodo}
                onRemoveCard={onRemoveCard}
              />
              <Column
                type={ColumnType.DOING}
                cards={memoizedCardsDoing}
                onRemoveCard={onRemoveCard}
              />
              <Column
                type={ColumnType.DONE}
                cards={memoizedCardsDone}
                onRemoveCard={onRemoveCard}
              />
            </>
          ) : (
            <Loader />
          )}
          {showAddNewCardModal && (
            <AddNewCardModal onClose={onHideAddNewCardModal} onSend={onSendNewCard} />
          )}
        </div>
      </body>
    </div>
  );
}

export default App;
