import { Nav, Button, Container, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

import { NavLink } from "react-router-dom"
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
    // For now, let's just display an alert with the order details
    const orderSummary = cartItems.map((cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id);
      const totalPrice = item ? item.price * cartItem.quantity : 0;
      return `${cartItem.quantity} x ${item?.name}: ${formatCurrency(
        totalPrice
      )}`;
    });

    // alert(`Выбранные товары:\n${orderSummary.join("\n")}\nСумма заказа: ${formatCurrency(
    //   totalPrice
    // )}`);
  };

  return (
    <Container>
      <h1>Выбранные товары</h1>
      {cartItems.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <div className="fw-bold fs-5">
      Сумма заказа: {formatCurrency(totalPrice)}
      </div>
      <Nav.Link to="/checkout" as={NavLink}><Button onClick={handlePlaceOrder} variant="warning" >Заполнить данные заказа</Button></Nav.Link>
    </Container>
  );
}

type CartItemProps = {
  id: number;
  quantity: number;
};

function CartItem({ id, quantity }: CartItemProps) {
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "", height: "125px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
    </Stack>
  );
}
