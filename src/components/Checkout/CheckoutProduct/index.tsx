import { AiFillStar } from 'react-icons/ai';
import { useGlobalContext } from '../../../context/GlobalContext';
import './styles.scss';
import { useLocation } from 'react-router-dom';

interface IProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  hideButton?: boolean;
}

function CheckoutProduct({
  id,
  image,
  title,
  price,
  rating,
  hideButton,
}: IProps) {
  const [{ basket }, dispatch] = useGlobalContext();
  const { pathname } = useLocation();

  const removeFromBasket = () => {
    if (basket.length > 1 || pathname !== '/payment') {
      // remove the item from the basket
      dispatch({
        type: 'REMOVE_FROM_BASKET',
        payload: id,
      });
    } else {
      return alert("You want to buy an empty basket? That's not possible!");
    }
  };

  return (
    <div className='checkoutProduct'>
      <img className='checkoutProduct__image' src={image} />

      <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>
        <p className='checkoutProduct__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='checkoutProduct__rating'>
          {Array(rating)
            .fill(rating)
            .map((_, i) => (
              <p key={i}>
                <AiFillStar />
              </p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
