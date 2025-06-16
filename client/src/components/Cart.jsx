import { useSelector } from 'react-redux';

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalAmount);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          {item.name} - {item.quantity} x ${item.price}
        </div>
      ))}
      <h3>Total: ${total}</h3>
    </div>
  );
};

export default Cart;