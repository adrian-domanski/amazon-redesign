import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { GlobalContextProvider } from './context/GlobalContext';
import reducer, { initialState } from './context/reducers/globalReducer';

ReactDOM.render(
  <GlobalContextProvider initialState={initialState} reducer={reducer}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GlobalContextProvider>,
  document.getElementById('root') as HTMLElement
);
