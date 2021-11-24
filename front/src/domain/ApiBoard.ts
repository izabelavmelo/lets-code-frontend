import { Card, NewCard } from './Card';

export interface LoginResponse {
  token: string;
}

export interface FetchCardsResponse {
  cards: Card[];
}

export interface AddNewCardResponse {
  card: Card;
}

export interface UpdateCardResponse {
  card: Card;
}

export interface RemoveCardResponse {
  cards: Card[];
}

export interface BoardService {
  login(login: string, password: string): Promise<LoginResponse>;
  getCards(token: string): Promise<FetchCardsResponse>;
  addNewCard(token: string, newCard: NewCard): Promise<AddNewCardResponse>;
  removeCard(token: string, id: string): Promise<RemoveCardResponse>;
  updateCard(token: string, newCard: Card): Promise<UpdateCardResponse>
}