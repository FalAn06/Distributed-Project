import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Products.css';

const Products = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('matematica');
  const [reviews, setReviews] = useState({}); // Estado para las reseñas cargadas (por producto)
  const [reviewText, setReviewText] = useState(''); // Estado para el texto de la reseña
  const [cartItems, setCartItems] = useState([]); // Estado para el carrito

  const products = {
    matematica: [
      {
        name: 'El universo de las matematicas',
        description: 'Un recorrido alfabetico por los grandes teoremas',
        price: '$10',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro+mate/mate+1.jpg',
        productId: '123',
      },
      {
        name: 'Matematica introductoria',
        description: 'Por Manuel Murillo',
        price: '$18',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro+mate/mate+2.jpg',
        productId: '124',
      },
      {
        name: 'El libro de las matematicas',
        description: 'Libro con ejercicios didacticos',
        price: '$30',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro+mate/mate+3.jpg',
        productId: '125',
      },
      {
        name: 'Matematica superior',
        description: 'Calculo diferencial integral',
        price: '$15',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro+mate/mate+4.jpg',
        productId: '126',
      },
    ],
    fisica: [
      {
        name: 'Historia fisica universo',
        description: 'Por Eduardo Battaner',
        price: '$5',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro+fisica/fisica+1.jpg',
        productId: '223',
      },
      {
        name: 'La historia de la fisica',
        description: 'De la filosofia natural al enigma de la materia oscura',
        price: '$8',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro+fisica/fisica+2.webp',
        productId: '224',
      },
      {
        name: 'Fisica Cuantica',
        description: 'Desafiando la intuicion',
        price: '$12',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro+fisica/fisica+3.jpg',
        productId: '225',
      },
      {
        name: 'Fisica Universitaria',
        description: 'Con fisica moderna',
        price: '$6',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro+fisica/fisica+4.jpg',
        productId: '226',
      },
    ],
    variado: [
      {
        name: 'Ciencie e ingenieria de materiales',
        description: 'Por Donald R. Askeland',
        price: '$20',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libros+variados/va+1.jpg',
        productId: '323',
      },
      {
        name: 'Gestion industrial',
        description: 'Fundamentos, herramientas e indicadores',
        price: '$50',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libros+variados/va+2.webp',
        productId: '324',
      },
      {
        name: 'Fisica para ingenieria Civil',
        description: '101 problemas utiles',
        price: '$35',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libros+variados/va+3.jpg',
        productId: '325',
      },
      {
        name: 'ingenieria Ambiental',
        description: 'Por Javier Diaz',
        price: '$25',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libros+variados/va+4.jpg',
        productId: '326',
      },
    ],
  };

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Función para manejar el envío de reseña
  const handleAddReview = async (productId) => {
    if (!reviewText) {
      alert('Por favor, ingresa una reseña.');
      return;
    }

    const reviewData = {
      productId,
      review: reviewText,
      rating: 5, // Este ejemplo tiene una calificación de 5
    };

    try {
      const response = await fetch(`http://3.93.94.180/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();
      if (data.message) {
        alert('Reseña agregada con éxito');
        setReviewText(''); // Limpiar el campo de reseña
        fetchReviews(productId); // Refrescar las reseñas después de agregar una nueva
      } else {
        alert('Error al agregar reseña');
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  };

  // Función para obtener reseñas de un producto
  const fetchReviews = async (productId) => {
    try {
      const response = await fetch(`http://3.93.94.180:5001/reviews?productId=${productId}`);
      const data = await response.json();
      setReviews(prevReviews => ({ ...prevReviews, [productId]: data.reviews }));
    } catch (error) {
      alert('Error al cargar reseñas');
    }
  };

  // Función para agregar al carrito
  const handleAddToCart = async (productId) => {
    const cartData = {
      productId, // Solo se pasa el productId
    };

    try {
      const response = await fetch('http://3.93.94.180/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData),
      });

      const data = await response.json();
      if (data.message) {
        alert('Producto agregado al carrito');
        setCartItems([...cartItems, cartData]); // Agregar el producto al carrito
      } else {
        alert('Error al agregar producto al carrito');
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  };

  // Función para redirigir al carrito
  const handleViewCart = () => {
    navigate('/cart');
  };

  // Función para regresar a la página anterior
  const handleGoBack = () => {
    navigate(-1); // Volver a la página anterior
  };

  return (
    <div className="products-container">
      <div className="category-menu">
        <button onClick={() => handleCategoryChange('matematica')}>Libros Matematicas</button>
        <button onClick={() => handleCategoryChange('fisica')}>Libros Fisica</button>
        <button onClick={() => handleCategoryChange('variado')}>Libros Variados</button>
      </div>

      <h1 className="category-title">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h1>

      <div className="products-grid">
        {products[selectedCategory].map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="product-price">{product.price}</p>

            <button onClick={() => handleAddToCart(product.productId)} className="add-to-cart-button">
              Reservar
            </button>

            <textarea
              placeholder="Escribe tu reseña"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="review-textarea"
            />
            <button onClick={() => handleAddReview(product.productId)} className="add-review-button">
              Comentar
            </button>

            <button onClick={() => fetchReviews(product.productId)} className="view-reviews-button">
              Ver reseñas
            </button>

            <div className="reviews-container">
              {reviews[product.productId]?.length > 0 ? (
                reviews[product.productId].map((review, idx) => (
                  <div key={idx} className="review-card">
                    <p><strong>{review.user}</strong></p>
                    <p>{review.review}</p>
                    <p><strong>Calificación:</strong> {review.rating} estrellas</p>
                  </div>
                ))
              ) : (
                <p>No hay reseñas para este producto.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleViewCart} className="view-cart-button">
        Ver mis reservas
      </button>

      <button onClick={handleGoBack} className="back-button">
        Regresar
      </button>
    </div>
  );
};

export default Products;
