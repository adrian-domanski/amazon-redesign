import './styles.scss';
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../context/GlobalContext';
import { getBasketTotal } from '../../../context/reducers/globalReducer';

function Subtotal() {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useGlobalContext();

  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
              <input type='checkbox' /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />

      <button onClick={(e) => navigate('/payment')}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
