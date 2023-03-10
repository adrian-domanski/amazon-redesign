import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './components/Checkout';
import { GlobalContextProvider } from './context/GlobalContext';
import reducer, { initialState } from './context/reducers/globalReducer';
import Login from './components/Login';

function App() {
  return (
    <GlobalContextProvider initialState={initialState} reducer={reducer}>
      <Router>
        <div className='app'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route
              path='/checkout'
              element={
                <>
                  <Header />
                  <Checkout />
                </>
              }
            />
            <Route
              path='/'
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </GlobalContextProvider>
  );
}

export default App;
