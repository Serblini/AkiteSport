
  
  import { Button, Container } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "../components/CartItem";
import storeItems from "../data/items.json";


export function Order() {
  const { cartItems } = useShoppingCart();
  

  const totalPrice = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.id === cartItem.id);
    const itemPrice = item ? item.price : 0;
    return total + itemPrice * cartItem.quantity;
  }, 0);

  const handlePlaceOrder = () => {
    // Logic for placing the order goes here
    // You can navigate to a confirmation page or perform other actions
    // For now, let's just navigate back to the home page
    
  };

  return (
    <Container>
      <h1>Сумма заказа</h1>
      {cartItems.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <div className="fw-bold fs-5">
        Total: {formatCurrency(totalPrice)}
      </div>
      <Button onClick={handlePlaceOrder}>Place Order</Button>
    </Container>
  );
}
