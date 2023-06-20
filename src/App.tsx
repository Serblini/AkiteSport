import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { Order } from "./pages/Order";
import { Thanks } from "./pages/Thanks";
import { ItemPage } from "./components/ItemPage";
import  {Login}  from "./pages/Login";
import { Registration } from "./pages/Registration";
import Account from "./pages/Account"; // Используем правильный импорт
import { CheckoutForm } from "./pages/ChekoutForm";

function App() {
  return (
    <Container className="mb-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:id" element={<ItemPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment" element={<Thanks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/account" element={<Account />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Container>
  );
}

export default App;
