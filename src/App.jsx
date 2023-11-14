import React from "react";
import CardsProducts from "./components/CardsProducts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DetalleProductos from "./components/DetalleProductos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/itemsGet/:texto" element={<CardsProducts />} />
        <Route path="/item/:id" element={<DetalleProductos />} />
        {/* Other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
