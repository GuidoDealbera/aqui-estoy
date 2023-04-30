import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux'
import { postCompanion,postSupervisor } from '../../../../Redux/Actions/postPutActions';

const CreateUser = () => {
  const dispatch=useDispatch()
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
    // console.log(userData);
    if(userData.role==="Companion"){
      dispatch(postCompanion({email:userData.email,password:userData.password}))
    }else{
      dispatch(postSupervisor({email:userData.email,password:userData.password}))
    }
    }


  return (
    <Box>
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        {/* <Box marginBottom={2}>
          <TextField
            label="Nombre de usuario"
            name="username"
            value={userData.username}
            onChange={handleChange}
            fullWidth
          />
        </Box> */}
        <Box marginBottom={2}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            label="Contraseña"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel>Rol</InputLabel>
            <Select
              name="role"
              value={userData.role}
              onChange={handleChange}
              label="Rol"
            >
              <MenuItem value="">
                <em>Selecciona un rol</em>
              </MenuItem>
              <MenuItem value="Supervisor">Supervisor</MenuItem>
              <MenuItem value="Companion">Acompañante</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Crear Usuario
        </Button>
      </form>
    </Box>
  );
};

export default CreateUser;
