import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Obtener los productos del carrito
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://98.85.200.29:5002/cart');
        const data = await response.json();
        setCartItems(data.cart);
      } catch (error) {
        alert('Error al obtener el carrito');
      }
    };

    fetchCartItems();
  }, []);

  // Función para eliminar un producto del carrito
  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(`http://98.85.200.29:5002/cart/${productId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.message) {
        setCartItems(cartItems.filter(item => item.productId !== productId));
        alert('Producto eliminado del carrito');
      } else {
        alert('Error al eliminar el producto');
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Mi Carrito</h1>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.productId} className="cart-item">
              <p><strong>Producto ID:</strong> {item.productId}</p>
              <button 
                onClick={() => handleRemoveFromCart(item.productId)} 
                className="remove-button"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
      <div className="back-button-container">
        <button onClick={() => navigate('/products')} className="back-button">
          Volver a Productos
        </button>
      </div>
    </div>
  );
};

export default Cart;
