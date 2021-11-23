import { Card } from './Card';

export interface LoginResponse {
  token: string;
}

export interface FetchCardsResponse {
  cards: Card[];
}

export interface BoardService {
  login(login: string, password: string): Promise<LoginResponse>;
  getCards(token: string): Promise<FetchCardsResponse>;
}