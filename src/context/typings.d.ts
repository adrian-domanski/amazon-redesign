export interface IBasketItem {}
export interface IUser {}

type ActionType =
  | 'ADD_TO_BASKET'
  | 'EMPTY_BASKET'
  | 'REMOVE_FROM_BASKET'
  | 'SET_USER';

interface IAction {
  payload?: any;
  type: ActionType;
}

export interface IInitialState {
  basket: IBasketItem[];
  user: IUser | null;
}

export interface IBasketItem {
  id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
}

export interface IUser {
  email: string;
  uid: string;
  displayName: string;
  photoURL: string;
}

export type IGlobalContext = [IInitialState, React.Dispatch<IAction>];
