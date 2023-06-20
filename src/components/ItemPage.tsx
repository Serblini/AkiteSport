import { useParams } from "react-router-dom";
import { Card, Col, Button, Image, Row, Badge } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";

export function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const itemId = Number(id);

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const item = storeItems.find((item) => item.id === itemId);

  if (!item) {
    return <div>Элемент не найден</div>;
  }

  const { name, price, imgUrl, desc } = item;
  const quantity = getItemQuantity(itemId);

  return (
    <Row>
      <Col xs={12} md={6}>
        <Image src={imgUrl} alt={name} fluid />
      </Col>
      <Col xs={12} md={6}>
        <h1>{name}</h1>
        <Row
         style={
          {
              background: 2 % 2 === 0 ? 
              'light' : 'transparent', padding: 10, 
              fontSize: '24px', textAlign: "justify" }}>
                {desc}
        </Row>
        <p  style={{fontSize: '24px'}}>Цена:   <Badge bg="primary">{formatCurrency(price)}</Badge></p>
        {quantity === 0 ? (
          <Button variant="warning" onClick={() => increaseCartQuantity(itemId)}>
            + В корзину
          </Button>
        ) : (
          <div>
            <Button variant="warning" onClick={() => decreaseCartQuantity(itemId)}>
              -
            </Button>
            <span>{quantity} в корзине</span>
            <Button variant="warning" onClick={() => increaseCartQuantity(itemId)}
            style={{marginRight:50}}
            >
              +
            </Button>
            <Button variant="danger" onClick={() => removeFromCart(itemId)}>
              Убрать
            </Button>
          </div>
        )}
      </Col>
    </Row>
  );
}
