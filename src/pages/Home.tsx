import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Nav,Container, Row, Col, Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";
import "./Home.css";

export function Home() {
  const featuredItems = storeItems.slice(0, 4);

  return (
    <Container>
      <h1 className="mb-4">Добро пожаловать в наш интернет-магазин спортотоваров!</h1>
      <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} className="custom-carousel">
        {featuredItems.map((item) => (
          <div key={item.id}>
            <img src={item.imgUrl} alt={item.name} className="carousel-image" />
            <p className="legend">{item.name}</p>
          </div>
        ))}
      </Carousel>
      <h2 className="mb-4">Популярные товары</h2>
      <Row>
        {featuredItems.map((item) => (
          <Col key={item.id} sm={6} md={4} lg={3}>
            <Card className="mb-4">
              <Card.Img variant="top" src={item.imgUrl} className="product-image" />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>{formatCurrency(item.price)}</Card.Text>
                <Nav.Link to={`/store/${item.id}`} as={NavLink}><Button variant="primary">
                  Подробнее
                </Button></Nav.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
