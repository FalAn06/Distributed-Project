import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Products.css';

const Products = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('botellones');
  const [reviews, setReviews] = useState({}); // Estado para las reseñas cargadas (por producto)
  const [reviewText, setReviewText] = useState(''); // Estado para el texto de la reseña
  const [cartItems, setCartItems] = useState([]); // Estado para el carrito

  const products = {
    botellones: [
      {
        name: 'Botellón de 5L',
        description: 'Ideal para familias grandes',
        price: '$10',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/botellones/botellon5litros.jpg',
        productId: '123',
      },
      {
        name: 'Botellón de 10L',
        description: 'Botellón grande para oficinas',
        price: '$18',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/botellones/botellon10.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCf%2BPUe14kMIJzCj0rbysf6k6y%2BhaI%2BrHxMoSNsOmweNgIgRO%2F%2BfJug2AucHZoRCoNkkXfIcOyOJK4QdnGhRB0Hrwsq5AMIsv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw4NzQ2NzY1NDgyNTAiDMbwmcEOetNqe2jU4Sq4A8Mt2MWaqpM6mOa0lWM4%2BpUeBNCEcNaZdDCtWqQRrdonL4iSKjEjzirF1bCcEQD0eJJWfqcHH11RzJNM0V%2F%2FBZagOucoBcyxdM4nFDgZJ5%2FzvoJhSemxoyahMrXcaP6UadcXGpBAmDJeB%2F0ON%2BAuRppPQPqnhSMM%2Fe7K9D%2B%2B7koUEVJqld2%2BBw3DLZuk6Yz3cxC7L3rJ%2FBQTPRcSemBTXt%2FF1TEGUbSj%2BPS%2FOjiBTAuBSGvZmGS6kJWoUdSsgXrq4kkuennTpLwUwtl%2Fhev9tIj7hoTijPkCSYj7V5vpl1xqenekslV7xQPzpbW1CK%2FixBg8wLCDgFIcqNvg3aY8LEod97CJHktrUHWscZmFbyaEVv%2FWPilv%2BmwhvpIcOff7v6PGDFnn0tDvj152Bv0%2Fh2%2BvI5DCYgoNtnHxtVG5Iack2wkEb0NKBZimD4Ubo5lcHSohDzoNTYalN%2Bidb3c52cTkX1ws1Xs4ZVPkG0d6YfYxuYf9N1NXHPKDUJAARQza%2Fxeq0fUasVg5jTGJc6y6Eyks4H%2Be7LBxyNMDlcXOW0ND3pjsJK%2FsGtsdd1WuRzTIV82YGdUqdSq%2BMOGB8cMGOrcC39A6EDgOJn3Kb7M6tWB%2FKzxhoTOQtbuB6JK0SzVCSOQW2ty5Ie2Prdu%2BtMO882rR%2FfHPe3fRqIjU6tpOGUHjrifm3Eaa5SYRsu2jjVZocMtib58olfrRJs9u%2BAR1zX1KlUpAzWXkvTBPF566Rg4Bz5SMOOFGVg%2FJVisPZSEC8FHvbZskJm7eIiPnMIaT%2FxHX2AboQPD7ycQKIWOmkjPptlC6D4KVUM6x%2BJRgWOTkBnjjNeA%2Fy0ZBG1q21nJ371xegWa%2FOcQI2nRullPRo3TnSruVT5Ti0Ij7QbWo1qS62BOQi0INjveUEAQh3ds1g4AvVlw7gtPhOEFO0%2FHrc6gxdFTTG%2B8b2hwp3b06ERvmH1KAgQK24swyXooUt73RI7Rq7mUTOeivAio8s%2FgOxwdbYdesXMyptog%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4XJWI6KNOUEUHD2J%2F20250720%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250720T010705Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=631249ea1c85f462bc23189c178f338f518ca7e287a3f2209da43c4aeb83050c',
        productId: '124',
      },
      {
        name: 'Botellón de 20L',
        description: 'Botellón para uso comercial',
        price: '$30',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/botellones/botellon20.jpg',
        productId: '125',
      },
      {
        name: 'Botellón de 7L',
        description: 'Botellón práctico para el hogar',
        price: '$15',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/botellones/botellon7.jpg',
        productId: '126',
      },
    ],
    valvulas: [
      {
        name: 'Válvula de cierre',
        description: 'Válvula para botellones de agua',
        price: '$5',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/valvulas/valvudecierre.jpg',
        productId: '223',
      },
      {
        name: 'Válvula de seguridad',
        description: 'Para evitar fugas de agua',
        price: '$8',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/valvulas/V%C3%A1lvula%20de%20seguridad.jpg',
        productId: '224',
      },
      {
        name: 'Válvula de presión',
        description: 'Regula la presión del agua',
        price: '$12',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/valvulas/V%C3%A1lvula%20de%20presi%C3%B3n.jpg',
        productId: '225',
      },
      {
        name: 'Válvula de drenaje',
        description: 'Ideal para sistemas de filtrado',
        price: '$6',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/valvulas/V%C3%A1lvula%20de%20drenaje.jpg',
        productId: '226',
      },
    ],
    filtros: [
      {
        name: 'Filtro de agua básico',
        description: 'Filtro de agua doméstico',
        price: '$20',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/filtros/Filtro%20de%20agua%20b%C3%A1sico.jpg',
        productId: '323',
      },
      {
        name: 'Filtro de agua industrial',
        description: 'Filtrado para grandes cantidades de agua',
        price: '$50',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/filtros/Filtro%20de%20agua%20industrial.jpg',
        productId: '324',
      },
      {
        name: 'Filtro purificador',
        description: 'Purifica el agua eliminando bacterias',
        price: '$35',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/filtros/Filtro%20purificador.jpg',
        productId: '325',
      },
      {
        name: 'Filtro de carbón activado',
        description: 'Elimina impurezas y malos olores',
        price: '$25',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/filtros/Filtro%20de%20carb%C3%B3n%20activado.jpg',
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
      const response = await fetch(`http://98.85.200.29/api/review`, {
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
      const response = await fetch(`http://98.85.200.29:5001/reviews?productId=${productId}`);
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
      const response = await fetch('http://98.85.200.29:5002/cart', {
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
        <button onClick={() => handleCategoryChange('botellones')}>Botellones</button>
        <button onClick={() => handleCategoryChange('valvulas')}>Válvulas</button>
        <button onClick={() => handleCategoryChange('filtros')}>Filtros</button>
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
              Añadir al carrito
            </button>

            <textarea
              placeholder="Escribe tu reseña"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="review-textarea"
            />
            <button onClick={() => handleAddReview(product.productId)} className="add-review-button">
              Añadir reseña
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
        Ver mi carrito
      </button>

      <button onClick={handleGoBack} className="back-button">
        Regresar
      </button>
    </div>
  );
};

export default Products;
