import React, { useState, useEffect } from "react";
import { Container, Card, Badge } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export function Thanks() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const firstName = queryParams.get("firstName");
  const lastName = queryParams.get("lastName");
  const email = queryParams.get("email");
  const totalPrice = queryParams.get("totalPrice");

  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Генерация случайного номера заказа
    const randomOrderNumber = Math.floor(10000000 + Math.random() * 90000000);
    setOrderNumber(randomOrderNumber.toString());
  }, []);

  return (
    <Container>
      <h1>Оплата</h1>
      <Card>
        <Card.Body>
          <Card.Title>Уважаемый {firstName} {lastName},</Card.Title>
          <Card.Text>
            Ваша заявка на покупку была получена и находится в процессе обработки.
            В ближайшее время на указанный вами адрес <Badge bg="success">({email}) </Badge> будет отправлено письмо с дополнительной информацией по оплате.
          </Card.Text>
          <Card.Text>
            Номер вашего заказа: <Badge bg="success">{orderNumber}</Badge>
          </Card.Text>
          <Card.Text>
            Общая сумма заказа: <Badge bg="success">{totalPrice}₽</Badge>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
