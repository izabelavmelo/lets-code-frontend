import { BoardService, FetchCardsResponse, LoginResponse } from '../domain/ApiBoard'
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
}
