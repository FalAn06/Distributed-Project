import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState(null);
  const [captchaText, setCaptchaText] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://3.92.9.164:8001/login', {
        email,
        password,
        captcha: captchaText
      });

      localStorage.setItem('token', res.data.token);
      alert('Login exitoso');
      navigate('/dashboard');
    } catch (err) {
      alert('Login fallido');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        {/* LOGO DESDE PUBLIC */}
        <img
          src="/logoUCE.png"
          alt="Logo Biblioteca FICA"
          className="login-logo-img"
        />

        <h1 className="login-logo">Biblioteca Integral FICA</h1>

        <h2 className="login-title">Iniciar sesión</h2>

        <input
          type="text"
          placeholder="Usuario"
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        {captcha && (
          <div>
            <img src={captcha} alt="captcha" />
            <input
              type="text"
              placeholder="Ingresa el captcha"
              onChange={(e) => setCaptchaText(e.target.value)}
              className="login-input"
            />
          </div>
        )}

        <button onClick={handleLogin} className="login-button">
          Login
        </button>

        <p className="login-footer">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="login-link">
            Regístrate aquí
          </Link>
          <br />
          <Link to="/root-login" className="login-link">
            Eres usuario Root, da click aquí
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
