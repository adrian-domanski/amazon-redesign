import './styles.scss';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from '../../CheckoutProduct';
import { IBasketItem } from '../../../../context/typings';
import { IOrder } from '../../../../typings';

interface IProps {
  order: IOrder;
}

function Order({ order }: IProps) {
  return (
    <div className='order'>
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
      <p className='order__id'>
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item: IBasketItem) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className='order__total'>Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
    </div>
  );
}

export default Order;
