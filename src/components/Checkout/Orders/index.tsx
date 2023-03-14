import { useState, useEffect } from 'react';
import './styles.scss';
import Order from './Order';
import { useGlobalContext } from '../../../context/GlobalContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { IOrder } from '../../../typings';
import { db } from '../../../utils/firebase';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const [{ user, basket }] = useGlobalContext();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const userOrdersRef = collection(db, 'users', user?.uid, 'orders');
      const ordersQuery = query(userOrdersRef, orderBy('created', 'desc'));

      onSnapshot(ordersQuery, (snapshot) => {
        const orders = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setOrders(orders);
      });
    } else {
      setOrders([]);
    }
  }, [user]);

  // If no user redirect to login
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user]);

  return (
    <div className='orders'>
      {orders.length ? (
        <h1>Your Orders</h1>
      ) : (
        <h1>Your orders will be shown here.</h1>
      )}

      <div className='orders__order'>
        {orders?.map((order: IOrder) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
