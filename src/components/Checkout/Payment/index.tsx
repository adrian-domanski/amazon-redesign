import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import CurrencyFormat from 'react-currency-format';
import { useGlobalContext } from '../../../context/GlobalContext';
import { getBasketTotal } from '../../../context/reducers/globalReducer';
import CheckoutProduct from '../CheckoutProduct';
import { db } from '../../../utils/firebase';
import { collection, setDoc, doc } from 'firebase/firestore';
import axios from '../../../utils/axios';

function Payment() {
  const [{ basket, user }, dispatch] = useGlobalContext();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<StripeCardElementChangeEvent | string>('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const getClientSecret = async () => {
      const total = getBasketTotal(basket) * 100;
      if (!basket.length) return;
      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${total}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

    try {
      await stripe
        ?.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements?.getElement(CardElement)!,
          },
        })
        .then(async ({ paymentIntent }) => {
          if (!paymentIntent || !user) {
            return console.error(
              'Undefined paymentIntent or user',
              paymentIntent,
              user
            );
          }

          const userOrdersRef = collection(db, 'users', user.uid, 'orders');
          const orderDocRef = doc(userOrdersRef, paymentIntent.id);

          try {
            await setDoc(orderDocRef, {
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });

            setSucceeded(true);
            setError('');
            setProcessing(false);

            dispatch({
              type: 'EMPTY_BASKET',
            });

            setTimeout(() => navigate('/orders'));
          } catch (err) {
            console.error('Error adding user order:', err);
          }
        });
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleChange = (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>

        {/* Payment section - delivery address */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                key={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section - Payment method */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            {/* Stripe magic will go */}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className='payment__priceContainer'>
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
                <button disabled={!!processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
