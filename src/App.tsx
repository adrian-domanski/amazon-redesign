import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './components/Checkout';
import { useGlobalContext } from './context/GlobalContext';
import Login from './components/Login';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';

function App() {
  const [_, dispatch] = useGlobalContext();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        dispatch({ type: 'SET_USER', payload: user });
      } else {
        // User is signed out
        dispatch({ type: 'SET_USER', payload: null });
      }
    });
  }, []);

  return (
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
  );
}

export default App;
