import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route
            path='/checkout'
            element={
              <>
                <Header />
                <h1>I'm a checkout</h1>
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
