import { Card } from './Card';

export interface LoginResponse {
  token: string;
}

export interface FetchCardsResponse {
  cards: Card[];
}

export interface AddNewCardResponse {
  card: Card;
}

export interface BoardService {
  login(login: string, password: string): Promise<LoginResponse>;
  getCards(token: string): Promise<FetchCardsResponse>;
  addNewCard(token: string, newCard: Card): Promise<AddNewCardResponse>;
}