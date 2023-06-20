import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useAuth } from "../context/AuthContext";

export const Registration = observer(() => {
  const store = useAuth(); // Используем хранилище из MobX
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      console.log("Введите email и пароль");
      return;
    }

    if (password !== confirmPassword) {
      console.log("Пароль и подтверждение пароля не совпадают");
      return;
    }

    try {
      const existingUser = await store.getUserByEmail(email); // Используем метод из хранилища MobX
      if (existingUser.length > 0) {
        console.log("Пользователь с таким email уже существует");
        return;
      }

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = { email, password: hashedPassword };
      const addedUser = await store.addUser(newUser); // Используем метод из хранилища MobX
      console.log("Новый пользователь успешно добавлен:", addedUser);

      // Выполните необходимые действия после успешной регистрации

      // Перенаправление на страницу авторизации
      navigate("/login");
    } catch (error) {
      console.error("Ошибка при регистрации пользователя:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <h1>Регистрация</h1>
          <Form onSubmit={handleRegistration}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Подтвердите пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Зарегистрироваться
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
});
