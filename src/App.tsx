import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { RootState } from "./redux/store";

import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import OrderList from "./pages/OrderList";
import ProductList from "./pages/ProductList";

import SnackBar from "./components/@shared/SnackBar";
import Header from "./components/Header";

function App() {
  const { isShowSnackBar, message } = useSelector((state: RootState) => state.snackBar);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://react-payments-onstar.herokuapp.com/productList/20")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  console.log(user);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/*" element={<ProductList />} />
      </Routes>
      {isShowSnackBar && <SnackBar key={Date.now()} message={message} />}
    </Router>
  );
}

export default App;
