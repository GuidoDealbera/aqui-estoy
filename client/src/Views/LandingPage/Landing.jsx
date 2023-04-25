// src/components/LandingPage.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginSuccess, loginFail } from '../../Redux/Actions/actions';
import LoginForm from '../../Components/LoginForm/LoginForm';

const LandingPage = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleLogin = (values, { setSubmitting }) => {
    // Aquí es donde se implementaría la autenticación con el backend.
    // Simularemos una autenticación exitosa con datos estáticos.
    const user = {
      id: 1,
      name: 'John Doe',
      email: values.email,
    };

    if (values.email === 'john.doe@example.com' && values.password === 'password123') {
      dispatch(loginSuccess(user));
      history.push('/dashboard');
    } else {
      dispatch(loginFail('Invalid email or password'));
    }

    setSubmitting(false);
  };

  return (
    <div>
      <h1>Landing Page</h1>
      <LoginForm onSubmit={handleLogin} />
      {/* Añadir aquí el enlace o botón para recuperar contraseña */}
    </div>
  );
};

export default LandingPage;

// El componente LandingPage define una función handleLogin que maneja la autenticación del usuario. Simula la autenticación con datos estáticos y, si la autenticación es exitosa, se llama a la acción loginSuccess y se redirecciona al usuario a la página de inicio de la aplicación (/dashboard). Si la autenticación falla, se llama a la acción loginFail.

// Finalmente, el componente LandingPage renderiza el formulario de inicio de sesión utilizando el componente LoginForm y también puede incluir un enlace o botón para recuperar la contraseña.