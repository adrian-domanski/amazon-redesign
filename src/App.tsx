import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './components/Checkout';
import { GlobalContextProvider } from './context/GlobalContext';
import reducer, { initialState } from './context/reducers/globalReducer';

function App() {
  return (
    <GlobalContextProvider initialState={initialState} reducer={reducer}>
      <Router>
        <div className='app'>
          <Header />
          <Routes>
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </Router>
    </GlobalContextProvider>
  );
}

export default App;
