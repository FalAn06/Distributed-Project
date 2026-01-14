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
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro%20mate/mate%201.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLWVhc3QtMSJHMEUCIQDuhN4rZJLtSz2DA3ALyXb8ZXlsaMD%2BEzMwm21sxs1lDAIgNTsBdmR1lvHAQy31OOCvVLZaYSIAypHuJMPFqyA9DCsq2wMIExAEGgw3OTIzODQxMjA1MzMiDHcSRIxCF7eOnIEvFSq4A2cY%2Fl27UbYzdIdxZ7HWVEMKTAvKU2%2FG7wf3PD8dI38ebfMXc6L%2FDYsZ0HBODsTYk5zIpPdC48sYvRoV6g%2FllI6D01jyNkMWNukvMSTXDwUsNR%2BB4KWCeWt1674Ni0HtaRR1RCWNtV8udMmw%2BcUDJWVt7xXJXKhqwdGi3cBqYsDXEwHrjGufUpFp7VGW7fIA1Z5LvAEAcEWG7E1fd4AxmdxL5ERZSVA6oEtbGikCvhn0Kyz%2BqgK%2B8E8J3Cir02FV4GnCKrD%2Bmia3mv5%2B88Ya3ePYABo7QMIEXiyeLO8fyiLpdgg0VYcylFynp6tf47bPQl9eH6%2FxPE0Gm4sqCi1qW0ROd1C9yXKxFi7mznoERITmm9ZjChgYi72pog%2BoFxCfsiOrOq3322acGtI4gFjfvj4720C8f7N%2B7YTpHQFRGmGnEsUUBkKoeWAQxgG1SgrbzBiIsNUBffN9v18HSO9cEHylic5K951A7MqkUeQdwQPahd9e5isepgXAx9X%2FZpfSYBNtGyh52jd2WX8YyFJFD02xBEpdIddMHOK8MZk3ZyBCet2PYf33AsXWzCCeUzj8to1Fw8WVg9KEMPW3m8sGOrcCoa5%2FZQTd%2FJchs9KgoYEGgh8EVWfC0h5emeVQWetGZSJp6SVxaVT1XXQm%2BE74gbPEpHkCQeJM642u67Douk4nQZvgtJ6GxlDV%2B1cdUhvk2Y%2FZPIiOQUwxHws2GcLC%2F%2FNsUmDxH5SouSaDDRrJ0timaOb85eC6eDc3NvB8Iv3XvXhnxTmW%2FYsFn%2BQhrfyA6TnnXd4lGYEGT3m8%2FzbcfGwoHiUPaOqVKjrdmXey0o9oC%2B1bCaGLNIeSJv1qEkA6yhDShvZTpw2gv%2B9WoTglF7L%2BxvM%2BRyhOXVgpNU3eDWOX0gHn7MOYl7fDZQ4kfylZlnbOc5wYgFFcg9oJv32yO7Ww78lgq7Gt8pkjFcphq718y2ge35zZrG%2B%2BoNBk5CgH%2BXQXqT%2FpC7gcNW%2BCMBsx4VIGZ6TAVKAcmqA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3Q7OGE3KTMBQKLCW%2F20260114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260114T015706Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=78d3f8c4beaed88bd031d98a27bd1f84d7bbe110d4befc041963ae971d6f036d',
        productId: '123',
      },
      {
        name: 'Botellón de 10L',
        description: 'Botellón grande para oficinas',
        price: '$18',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro%20mate/mate%202.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLWVhc3QtMSJHMEUCIQDuhN4rZJLtSz2DA3ALyXb8ZXlsaMD%2BEzMwm21sxs1lDAIgNTsBdmR1lvHAQy31OOCvVLZaYSIAypHuJMPFqyA9DCsq2wMIExAEGgw3OTIzODQxMjA1MzMiDHcSRIxCF7eOnIEvFSq4A2cY%2Fl27UbYzdIdxZ7HWVEMKTAvKU2%2FG7wf3PD8dI38ebfMXc6L%2FDYsZ0HBODsTYk5zIpPdC48sYvRoV6g%2FllI6D01jyNkMWNukvMSTXDwUsNR%2BB4KWCeWt1674Ni0HtaRR1RCWNtV8udMmw%2BcUDJWVt7xXJXKhqwdGi3cBqYsDXEwHrjGufUpFp7VGW7fIA1Z5LvAEAcEWG7E1fd4AxmdxL5ERZSVA6oEtbGikCvhn0Kyz%2BqgK%2B8E8J3Cir02FV4GnCKrD%2Bmia3mv5%2B88Ya3ePYABo7QMIEXiyeLO8fyiLpdgg0VYcylFynp6tf47bPQl9eH6%2FxPE0Gm4sqCi1qW0ROd1C9yXKxFi7mznoERITmm9ZjChgYi72pog%2BoFxCfsiOrOq3322acGtI4gFjfvj4720C8f7N%2B7YTpHQFRGmGnEsUUBkKoeWAQxgG1SgrbzBiIsNUBffN9v18HSO9cEHylic5K951A7MqkUeQdwQPahd9e5isepgXAx9X%2FZpfSYBNtGyh52jd2WX8YyFJFD02xBEpdIddMHOK8MZk3ZyBCet2PYf33AsXWzCCeUzj8to1Fw8WVg9KEMPW3m8sGOrcCoa5%2FZQTd%2FJchs9KgoYEGgh8EVWfC0h5emeVQWetGZSJp6SVxaVT1XXQm%2BE74gbPEpHkCQeJM642u67Douk4nQZvgtJ6GxlDV%2B1cdUhvk2Y%2FZPIiOQUwxHws2GcLC%2F%2FNsUmDxH5SouSaDDRrJ0timaOb85eC6eDc3NvB8Iv3XvXhnxTmW%2FYsFn%2BQhrfyA6TnnXd4lGYEGT3m8%2FzbcfGwoHiUPaOqVKjrdmXey0o9oC%2B1bCaGLNIeSJv1qEkA6yhDShvZTpw2gv%2B9WoTglF7L%2BxvM%2BRyhOXVgpNU3eDWOX0gHn7MOYl7fDZQ4kfylZlnbOc5wYgFFcg9oJv32yO7Ww78lgq7Gt8pkjFcphq718y2ge35zZrG%2B%2BoNBk5CgH%2BXQXqT%2FpC7gcNW%2BCMBsx4VIGZ6TAVKAcmqA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3Q7OGE3KTMBQKLCW%2F20260114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260114T015749Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=50c6aad5b506289c683c295d233fc32cf76bb696554937c50c30e2f32fe3d360',
        productId: '124',
      },
      {
        name: 'Botellón de 20L',
        description: 'Botellón para uso comercial',
        price: '$30',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro%20mate/mate%203.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLWVhc3QtMSJHMEUCIQDuhN4rZJLtSz2DA3ALyXb8ZXlsaMD%2BEzMwm21sxs1lDAIgNTsBdmR1lvHAQy31OOCvVLZaYSIAypHuJMPFqyA9DCsq2wMIExAEGgw3OTIzODQxMjA1MzMiDHcSRIxCF7eOnIEvFSq4A2cY%2Fl27UbYzdIdxZ7HWVEMKTAvKU2%2FG7wf3PD8dI38ebfMXc6L%2FDYsZ0HBODsTYk5zIpPdC48sYvRoV6g%2FllI6D01jyNkMWNukvMSTXDwUsNR%2BB4KWCeWt1674Ni0HtaRR1RCWNtV8udMmw%2BcUDJWVt7xXJXKhqwdGi3cBqYsDXEwHrjGufUpFp7VGW7fIA1Z5LvAEAcEWG7E1fd4AxmdxL5ERZSVA6oEtbGikCvhn0Kyz%2BqgK%2B8E8J3Cir02FV4GnCKrD%2Bmia3mv5%2B88Ya3ePYABo7QMIEXiyeLO8fyiLpdgg0VYcylFynp6tf47bPQl9eH6%2FxPE0Gm4sqCi1qW0ROd1C9yXKxFi7mznoERITmm9ZjChgYi72pog%2BoFxCfsiOrOq3322acGtI4gFjfvj4720C8f7N%2B7YTpHQFRGmGnEsUUBkKoeWAQxgG1SgrbzBiIsNUBffN9v18HSO9cEHylic5K951A7MqkUeQdwQPahd9e5isepgXAx9X%2FZpfSYBNtGyh52jd2WX8YyFJFD02xBEpdIddMHOK8MZk3ZyBCet2PYf33AsXWzCCeUzj8to1Fw8WVg9KEMPW3m8sGOrcCoa5%2FZQTd%2FJchs9KgoYEGgh8EVWfC0h5emeVQWetGZSJp6SVxaVT1XXQm%2BE74gbPEpHkCQeJM642u67Douk4nQZvgtJ6GxlDV%2B1cdUhvk2Y%2FZPIiOQUwxHws2GcLC%2F%2FNsUmDxH5SouSaDDRrJ0timaOb85eC6eDc3NvB8Iv3XvXhnxTmW%2FYsFn%2BQhrfyA6TnnXd4lGYEGT3m8%2FzbcfGwoHiUPaOqVKjrdmXey0o9oC%2B1bCaGLNIeSJv1qEkA6yhDShvZTpw2gv%2B9WoTglF7L%2BxvM%2BRyhOXVgpNU3eDWOX0gHn7MOYl7fDZQ4kfylZlnbOc5wYgFFcg9oJv32yO7Ww78lgq7Gt8pkjFcphq718y2ge35zZrG%2B%2BoNBk5CgH%2BXQXqT%2FpC7gcNW%2BCMBsx4VIGZ6TAVKAcmqA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3Q7OGE3KTMBQKLCW%2F20260114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260114T015810Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=4dcb5e00e45be047686c68f81a55635259e8ae63a92fd0d74a08e76bd0f22a78',
        productId: '125',
      },
      {
        name: 'Botellón de 7L',
        description: 'Botellón práctico para el hogar',
        price: '$15',
        imageUrl: 'https://chamorro132.s3.us-east-1.amazonaws.com/libro%20mate/mate%204.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLWVhc3QtMSJHMEUCIQDuhN4rZJLtSz2DA3ALyXb8ZXlsaMD%2BEzMwm21sxs1lDAIgNTsBdmR1lvHAQy31OOCvVLZaYSIAypHuJMPFqyA9DCsq2wMIExAEGgw3OTIzODQxMjA1MzMiDHcSRIxCF7eOnIEvFSq4A2cY%2Fl27UbYzdIdxZ7HWVEMKTAvKU2%2FG7wf3PD8dI38ebfMXc6L%2FDYsZ0HBODsTYk5zIpPdC48sYvRoV6g%2FllI6D01jyNkMWNukvMSTXDwUsNR%2BB4KWCeWt1674Ni0HtaRR1RCWNtV8udMmw%2BcUDJWVt7xXJXKhqwdGi3cBqYsDXEwHrjGufUpFp7VGW7fIA1Z5LvAEAcEWG7E1fd4AxmdxL5ERZSVA6oEtbGikCvhn0Kyz%2BqgK%2B8E8J3Cir02FV4GnCKrD%2Bmia3mv5%2B88Ya3ePYABo7QMIEXiyeLO8fyiLpdgg0VYcylFynp6tf47bPQl9eH6%2FxPE0Gm4sqCi1qW0ROd1C9yXKxFi7mznoERITmm9ZjChgYi72pog%2BoFxCfsiOrOq3322acGtI4gFjfvj4720C8f7N%2B7YTpHQFRGmGnEsUUBkKoeWAQxgG1SgrbzBiIsNUBffN9v18HSO9cEHylic5K951A7MqkUeQdwQPahd9e5isepgXAx9X%2FZpfSYBNtGyh52jd2WX8YyFJFD02xBEpdIddMHOK8MZk3ZyBCet2PYf33AsXWzCCeUzj8to1Fw8WVg9KEMPW3m8sGOrcCoa5%2FZQTd%2FJchs9KgoYEGgh8EVWfC0h5emeVQWetGZSJp6SVxaVT1XXQm%2BE74gbPEpHkCQeJM642u67Douk4nQZvgtJ6GxlDV%2B1cdUhvk2Y%2FZPIiOQUwxHws2GcLC%2F%2FNsUmDxH5SouSaDDRrJ0timaOb85eC6eDc3NvB8Iv3XvXhnxTmW%2FYsFn%2BQhrfyA6TnnXd4lGYEGT3m8%2FzbcfGwoHiUPaOqVKjrdmXey0o9oC%2B1bCaGLNIeSJv1qEkA6yhDShvZTpw2gv%2B9WoTglF7L%2BxvM%2BRyhOXVgpNU3eDWOX0gHn7MOYl7fDZQ4kfylZlnbOc5wYgFFcg9oJv32yO7Ww78lgq7Gt8pkjFcphq718y2ge35zZrG%2B%2BoNBk5CgH%2BXQXqT%2FpC7gcNW%2BCMBsx4VIGZ6TAVKAcmqA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA3Q7OGE3KTMBQKLCW%2F20260114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260114T015830Z&X-Amz-Expires=10800&X-Amz-SignedHeaders=host&X-Amz-Signature=6ec79cb7bd6cd8b2dcf8bfc1c2fe8f64ddd1634d833c247cc962d476fec00534',
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
        <button onClick={() => handleCategoryChange('botellones')}>Libros Fisica</button>
        <button onClick={() => handleCategoryChange('valvulas')}>Libros Matematicas</button>
        <button onClick={() => handleCategoryChange('filtros')}>Libros Variados</button>
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
