import React, { useEffect, useState } from 'react';
import logo from './assets/logo.png';
import './App.css';
import ApiBoardService from './services/ApiBoardService';
import Column from './components/Column';
import { ColumnType } from './domain/Board';
import { Loader } from './components/Loader';
import { Card } from './domain/Card';
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

  const onSendNewCard = (card: Card) => {
    if (token) {
      apiBoardService.addNewCard(token, card)
    }
  }
  console.log(cards)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="header-text">
          Quadro Kanban - Lets Code
        </p>
        <CircleButton label="+" onClick={onShowAddNewCardModal} />
      </header>
      <body>
        <div className="App-body">
          {token && cards ? (
            <>
              <Column type={ColumnType.TODO} />
              <Column type={ColumnType.DOING} />
              <Column type={ColumnType.DONE} />
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
