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
import { FormControlLabel, Grid, Switch, Typography } from '@mui/material';

const CreateUser = () => {
  const dispatch=useDispatch()
  const [checked, setChecked] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    rol: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const checkedHandler = (event) => {
    setChecked(event.target.checked);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    //  implementar la lógica para crear el usuario, como llamar a una API o usar acciones de Redux
    if(userData.rol==="Companion1" && !userData.password || userData.rol==="Companion2" && !userData.password){
     return dispatch(postCompanion({email:userData.email,rol:userData.rol}))
    }
    if(userData.rol==="Companion1" || userData.rol==="Companion2"){
    return  dispatch(postCompanion({email:userData.email,password:userData.password,rol:userData.rol}))
    }
    if(userData.rol==="Supervisor" && !userData.password|| userData.rol==="SuperAdmin" && !userData.password){
    return  dispatch(postSupervisor({email:userData.email,rol:userData.rol}))
    }
    else{
     return dispatch(postSupervisor({email:userData.email,password:userData.password,rol:userData.rol}))
    }
    }


  return (
    <Box>
      <Typography variant="h5" sx={{textAlign:"center", margin:"2vw"}}>
      Crear Usuario</Typography>
      <Grid container justifyContent="center">
      <Grid item justifyContent="center" sx={{width:"40vw"}}>
      <form onSubmit={handleSubmit}>
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
        <FormControlLabel
          value="end"
          control={<Switch color="primary" checked={checked} onChange={checkedHandler} />}
          label={checked ? 'Contraseña manual' : 'Contraseña automática'}
          labelPlacement="end"
        />
        {checked && 
        <Box marginBottom={2}>
          <TextField
            label="Contraseña"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            fullWidth
          />
        </Box>}
        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel>Rol</InputLabel>
            <Select
              name="rol"
              value={userData.rol}
              onChange={handleChange}
              label="Rol"
            >
              <MenuItem value="">
                <em>Selecciona un rol</em>
              </MenuItem>
              <MenuItem value="SuperAdmin">Super Admin</MenuItem>
              <MenuItem value="Supervisor">Supervisor</MenuItem>
              <MenuItem value="Companion1">Acompañante 1</MenuItem>
              <MenuItem value="Companion2">Acompañante 2</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Crear Usuario
        </Button>
      </form>
      </Grid>
      </Grid>
    </Box>
  );
};

export default CreateUser;
