import React, { createContext, useContext, useReducer } from 'react';
import { IAction, IGlobalContext, IInitialState } from './typings';

// Prepares the dataLayer
export const GlobalContext = createContext<IGlobalContext>(null!);

interface IProps {
  reducer: (state: IInitialState, action: IAction) => IInitialState;
  initialState: IInitialState;
  children: React.ReactNode;
}

// Wrap our app and provide the Data layer
export const GlobalContextProvider = ({
  reducer,
  initialState,
  children,
}: IProps) => {
  const [globalState, globalDispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[globalState, globalDispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};

// Pull information from the data layer
export const useGlobalContext = () => useContext(GlobalContext);
