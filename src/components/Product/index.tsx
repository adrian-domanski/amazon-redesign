import './styles.scss';
import { AiFillStar } from 'react-icons/ai';
import { useGlobalContext } from '../../context/GlobalContext';
import toast, { Toaster } from 'react-hot-toast';
import { FaCartPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface IProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
}

function Product({ id, title, image, price, rating }: IProps) {
  const [{ user }, setGlobalContext] = useGlobalContext();
  const navigate = useNavigate();

  const handleNavigateToAuth = () => {
    return navigate('/login');
  };

  const addToBasket = () => {
    toast('Product added to basket!');
    setGlobalContext({
      type: 'ADD_TO_BASKET',
      payload: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
  };

  return (
    <div className='product'>
      <Toaster
        position='bottom-center'
        toastOptions={{ icon: <FaCartPlus className='product__toastIcon' /> }}
      />
      <div className='product__info'>
        <p>{title}</p>
        <p className='product__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='product__rating'>
          {Array(rating)
            .fill(rating)
            .map((_, i) => (
              <p key={i}>
                <AiFillStar className='product__star' />
              </p>
            ))}
        </div>
      </div>

      <img src={image} alt='' />

      {user ? (
        <button onClick={addToBasket}>Add to Basket</button>
      ) : (
        <button onClick={handleNavigateToAuth}>Sign In</button>
      )}
    </div>
  );
}

export default Product;
