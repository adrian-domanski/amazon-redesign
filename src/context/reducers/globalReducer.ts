import { IAction, IBasketItem, IInitialState } from '../typings';

export const initialState = {
  basket: [],
  user: null,
};

// Selector
export const getBasketTotal = (basket: IBasketItem[]) =>
  basket?.reduce((amount: number, item: IBasketItem) => item.price + amount, 0);

const reducer = (state: IInitialState, action: IAction) => {
  console.log(action);
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };

    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: [],
      };

    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.payload
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload}) as its not in basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
