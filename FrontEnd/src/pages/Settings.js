import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Settings.css';

function Settings() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let email = '';

  if (token) {
    try {
      const decoded = jwtDecode(token);
      email = decoded.email;
    } catch (err) {
      console.error('Token inválido');
    }
  }

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Función para cambiar la contraseña
  const handlePasswordChange = async () => {
    try {
      const res = await fetch('http://50.19.246.209:4567/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, oldPassword, newPassword })
      });
      const data = await res.json();
      if (data.message) {
        alert('Contraseña actualizada');
        localStorage.removeItem('token');
        navigate('/');
      } else {
        alert(data.error || 'Error al actualizar contraseña');
      }
    } catch (err) {
      alert('Fallo en la solicitud');
    }
  };

  // Función para eliminar la cuenta
  const handleAccountDelete = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.');
    if (confirmDelete) {
      try {
        const res = await fetch(`http://50.19.246.209:4569/delete_user?email=${email}`, {  
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (data.message) {
          alert('Tu cuenta ha sido eliminada exitosamente.');
          localStorage.removeItem('token');
          navigate('/');
        } else {
          alert(data.error || 'Error al eliminar la cuenta');
        }
      } catch (err) {
        alert('Fallo en la solicitud para eliminar la cuenta');
      }
    }
  };

  return (
    <div className="settings-container">
      <h2>Configuraciones de cuenta</h2>

      {/* Sección para cambiar contraseña */}
      <div className="form-section">
        <h3>Cambiar contraseña</h3>
        <input
          type="password"
          placeholder="Contraseña actual"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nueva contraseña"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handlePasswordChange}>Actualizar Contraseña</button>
      </div>

      {/* Sección para eliminar cuenta */}
      <div className="form-section delete-account">
        <h3>Eliminar cuenta</h3>
        <button onClick={handleAccountDelete} className="delete-account-button">
          Eliminar mi cuenta
        </button>
      </div>

      <button onClick={() => navigate('/dashboard')} className="back-button">
        Volver al perfil
      </button>
    </div>
  );
}

export default Settings;
