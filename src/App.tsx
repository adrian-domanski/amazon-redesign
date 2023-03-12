import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './components/Checkout';
import { useGlobalContext } from './context/GlobalContext';
import Login from './components/Login';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';
import Payment from './components/Checkout/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './components/Checkout/Orders';

const promise = loadStripe(
  'pk_test_51MkSMYAqVzAZlI7C8q68xIVBQE4OxSfp4hAvhBKxjSgQMHqJzRHlzaDWNv5xlPqcA5a9CBoALLE5Pa8z5LlXHMPw00UgjI45Qe'
);

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
            path='/orders'
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
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
            path='/payment'
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
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
