import { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { StoreItem } from "../components/StoreItem";
import storeItems from "../data/items.json";
import { StoreItemProps } from "../components/StoreItem";

export function Store() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Функция для фильтрации элементов по названию
  const filterItems = (item: StoreItemProps) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  };
  

  // Функция для сортировки элементов по цене
  const sortItems = (a: StoreItemProps, b: StoreItemProps) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  };

  // Фильтрация и сортировка элементов
  const filteredItems = storeItems
    .filter(filterItems)
    .sort(sortItems);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  return (
    <>
      <h1>Ассортимент</h1>

      <Form className="mb-3">
        <Form.Group className="mb-3" controlId="searchForm">
          <Form.Label>Поиск по названию:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите название"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="sortForm">
          <Form.Label>Сортировка по цене:</Form.Label>
          <Form.Select value={sortOrder} onChange={handleSort}>
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </Form.Select>
        </Form.Group>
      </Form>

      <Row md={2} xs={1} lg={3} className="g-3">
        {filteredItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
