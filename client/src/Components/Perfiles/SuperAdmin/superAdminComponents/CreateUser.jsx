import React, { useState } from 'react';

const CreateUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  implementar la lógica para crear el usuario, como llamar a una API o usar acciones de Redux
    console.log(userData);
  };

  return (
    <div>
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de usuario:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Rol:
          <select name="role" value={userData.role} onChange={handleChange}>
            <option value="">Selecciona un rol</option>
            <option value="supervisor">Supervisor</option>
            <option value="volunteer">Voluntario</option>
          </select>
        </label>
        <br />
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CreateUser;