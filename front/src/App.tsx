import React, { useEffect, useState } from 'react';
import logo from './assets/logo.png';
import './App.css';
import ApiBoardService from './services/ApiBoardService';
import Column from './components/Column';
import { ColumnType } from './domain/Board';
import { Loader } from './components/Loader';
import { Card } from './domain/Card';

function App() {
  const apiBoardService = new ApiBoardService()
  const [token, setToken] = useState<string>()
  const [cards, setCards] = useState<Card[]>()
  useEffect(() => {
    apiBoardService.login('letscode', 'lets@123').then((response) => {
      setToken(response.token)
    })
  }, [])

  useEffect(() => {
    if (token) {
      apiBoardService.getCards(token.replaceAll('"', '')).then((response) => {
        setCards(response.cards)
      })
    }
  }, [token])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="header-text">
          Quadro Kanban - Lets Code
        </p>
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
        </div>
      </body>
    </div>
  );
}

export default App;
