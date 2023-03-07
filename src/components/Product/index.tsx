import React from 'react';
import './styles.scss';
import { AiFillStar } from 'react-icons/ai';

interface IProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
}

function Product({ id, title, image, price, rating }: IProps) {
  // const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // dispatch the item into the data layer
    // dispatch({
    //   type: 'ADD_TO_BASKET',
    //   item: {
    //     id: id,
    //     title: title,
    //     image: image,
    //     price: price,
    //     rating: rating,
    //   },
    // });
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
              <p>
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
