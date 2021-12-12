import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Header,
  Home,
  NotFound,
  Product,
  ProductId,
  ProductIdComment,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redirect/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductId />} />
        <Route path="/product/:id/comment" element={<ProductIdComment />} />
        <Route path="/redirect" element={<Navigate to="/redirect/home" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
