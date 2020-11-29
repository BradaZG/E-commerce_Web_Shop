import React, { useEffect, useState } from 'react';

// import Navbar from './components/Navbar/Navbar';
// import Products from './components/Products/Products';

import { Products, Navbar } from './components';
import { commerce } from './lib/commerce';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const response = await commerce.products.list();
    const data = await response.data;
    //const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    // const response = await commerce.cart.retrieve();
    // const cart = await commerce.cart.retrieve();
    // setCart(cart)
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log('cart', cart);

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      <Products products={products} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default App;
