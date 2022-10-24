import "./App.css";
import Header from "./components/header/HeaderComponent";
import AddProduct from "./components/AddProduct/AddProduct";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Shop from "./components/ShopHome/Shop";

function App() {
  const [products, setProducts] = useState([]);
  const fetchProducts = useCallback(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/home" element={<Shop products={products} />} />
        <Route
          path="/admin/add-product"
          element={
            <AddProduct products={products} fetchProducts={fetchProducts} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
