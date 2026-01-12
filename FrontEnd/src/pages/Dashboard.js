import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [description, setDescription] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú desplegable
  const [randomFrase, setRandomFrase] = useState(''); // Estado para la frase aleatoria

  // Usamos useEffect para cargar los datos del usuario al montar el componente
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userEmail = decoded.email;
        setEmail(userEmail);

        const storedPic = localStorage.getItem(`profilePic-${userEmail}`);
        if (storedPic) {
          setProfilePic(storedPic);
        }

        fetch(`http://50.17.170.185:4565/get-description?email=${userEmail}`)
          .then((res) => res.json())
          .then((data) => {
            setDescription(data.description || 'Sin descripción');
          })
          .catch((err) => console.error('Error al cargar descripción:', err));
      } catch (err) {
        console.error('Token inválido');
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const goToSettings = () => {
    navigate('/settings');
  };

  const handleViewProducts = () => {
    navigate('/products');  // Redirige a la página de productos
  };

  // Función para obtener la frase aleatoria desde el microservicio
  const getFrase = () => {
    fetch('http://50.19.246.209:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          obtenerFrases
        }`
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      const frases = data.data.obtenerFrases;
      const randomIndex = Math.floor(Math.random() * frases.length);
      setRandomFrase(frases[randomIndex]);
    })
    .catch((error) => console.error('Error fetching frase:', error));
  };

  return (
    <div className="dashboard-container">
      {/* Menú desplegable */}
      <div className="menu-container">
        <button onClick={() => setMenuOpen(!menuOpen)} className="menu-button">
          ☰
        </button>
        {menuOpen && (
          <div className="dropdown-menu">
            <button onClick={goToSettings} className="dropdown-item">Configuraciones</button>
            <button onClick={handleLogout} className="dropdown-item">Cerrar sesión</button>
          </div>
        )}
      </div>

      {/* Título principal */}
      <h1 className="welcome-title">Bienvenido a Water Market</h1>

      {/* Perfil */}
      <div className="profile-container">
        <p className="dashboard-email">{email}</p>
        <p className="user-description">{description}</p>
      </div>

      {/* Botón de "Ver productos" */}
      <div className="view-products-container">
        <button onClick={handleViewProducts} className="view-products-button">
          Ver productos
        </button>
      </div>

      {/* Frase debajo del botón de productos */}
      <div className="store-description-container">
        <p className="store-description-text">
          {randomFrase}
        </p>
      </div>

      {/* Botón para obtener una nueva frase */}
      <div className="get-frase-container">
        <button onClick={getFrase} className="get-frase-button">
          Obtener una nueva frase
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
