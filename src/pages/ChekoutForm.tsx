import React, { useState, FormEvent } from "react";
import { Container, Form, Button, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import storeItems from "../data/items.json";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

export function CheckoutForm() {
  const { cartItems, clearCart } = useShoppingCart();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.id === cartItem.id);
    const itemPrice = item ? item.price : 0;
    return total + itemPrice * cartItem.quantity;
  }, 0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Additional data validation can be performed here if necessary
    if (firstName === "" || lastName === "" || deliveryAddress === "" || email === "") {
      // Если одно из полей не заполнено, выведите сообщение об ошибке или выполните другие действия
      alert("Пожалуйста, заполните все поля формы");
      return;
    }

    // Проверка на валидность email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Пожалуйста, введите корректный email-адрес");
      return;
    }

    // Очистка корзины
    clearCart();

    // Проверка адреса для добавления стоимости доставки
    let totalPriceWithDelivery = totalPrice;
    if (!deliveryAddress.includes("Россия") || !deliveryAddress.includes("РФ") ) {
      totalPriceWithDelivery += 600;
    }

    // Redirect the user to the payment page with the data passed as URL parameters
    navigate(
      `/payment?firstName=${firstName}&lastName=${lastName}&address=${deliveryAddress}&email=${email}&totalPrice=${totalPriceWithDelivery}`
    );
  };

  const deliveryTooltip = (
    <Tooltip id="delivery-tooltip">Дополнительная стоимость доставки: 600 рублей</Tooltip>
  );

  return (
    <Container>
      <h1>Данные для доставки</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите фамилию"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите имя"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Адрес доставки</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите адрес доставки"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <p style={{ fontSize: "24px" }}>
          Сумма заказа:{" "}
          <OverlayTrigger placement="right" overlay={deliveryTooltip}>
            <Badge bg="info" style={{ fontSize: "20" }}>
              {formatCurrency(totalPrice)}
              {(deliveryAddress && !deliveryAddress.includes("Россия") && !deliveryAddress.includes("РФ")) && (
        <span style={{ fontSize: "12px", marginLeft: "5px" }}>+600 руб.</span>
      )}
            </Badge>
          </OverlayTrigger>
        </p>

        <Button variant="success" type="submit" className="ml-20">
          Перейти к оплате
        </Button>
      </Form>
    </Container>
  );
}
