import React from 'react';
import './styles.scss';
import { AiFillStar } from 'react-icons/ai';
import { useGlobalContext } from '../../context/GlobalContext';

interface IProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
}

function Product({ id, title, image, price, rating }: IProps) {
  const [{ basket }, setGlobalContext] = useGlobalContext();

  const addToBasket = () => {
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

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
