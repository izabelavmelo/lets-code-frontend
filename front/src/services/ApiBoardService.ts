import {
  AddNewCardResponse,
  BoardService,
  FetchCardsResponse,
  LoginResponse
} from '../domain/ApiBoard'
import { Card } from '../domain/Card'
import { api } from './api'

export default class ApiBoardService implements BoardService {
  async login(login: string, password: string): Promise<LoginResponse> {
    const loginResponse = await api.post({
      url: 'login/',
      payload: {
        login,
        senha: password
      }
    })
    return {
      token: loginResponse.body
    }
  }

  async getCards(token: string): Promise<FetchCardsResponse> {
    const response = await api.get({
      url: 'cards/',
      token
    })
    return {
      cards: JSON.parse(response.body)
    }
  }

  async addNewCard(token: string, newCard: Card): Promise<AddNewCardResponse> {
    const response = await api.post({
      url: 'cards/',
      token,
      payload: { ...newCard }
    })
    return {
      card: JSON.parse(response.body)
    }
  }
}
