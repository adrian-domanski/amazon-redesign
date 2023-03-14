import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import CheckoutProduct from './CheckoutProduct';
import './styles.scss';
import Subtotal from './Subtotal';

function Checkout() {
  const [{ basket, user }] = useGlobalContext();
  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <img
          className='checkout__ad'
          src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
          alt=''
        />

        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className='checkout__title'>Your Shopping Basket</h2>
          {basket.length ? (
            basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))
          ) : (
            <div className='checkout__empty'>
              <h3>Basket is empty</h3>
              <Link to='/'>Check our collection</Link>
            </div>
          )}
        </div>
      </div>

      {basket.length > 0 && (
        <div className='checkout__right'>
          <Subtotal />
        </div>
      )}
    </div>
  );
}

export default Checkout;
