import { AiFillStar } from 'react-icons/ai';
import { useGlobalContext } from '../../../context/GlobalContext';
import './styles.scss';

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
  const [_, dispatch] = useGlobalContext();

  const removeFromBasket = () => {
    // remove the item from the basket
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      payload: id,
    });
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
              <p>
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
