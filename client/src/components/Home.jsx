import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductList } from './ProductList';

export const Home = () => {
  
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {        
        const response = await axios.get('https://fakestoreapi.com/products/category/electronics');
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []); 

  return (
    <section className="home-container">
      <div className="welcome-banner" style={{ textAlign: 'center', margin: '20px 0' }}>
        <h2>Bienvenido a ZhenNova</h2>
        <p>Tu tienda experta en Hardware y Periféricos</p>
      </div>

      <ProductList products={products} />
    </section>
  );
};