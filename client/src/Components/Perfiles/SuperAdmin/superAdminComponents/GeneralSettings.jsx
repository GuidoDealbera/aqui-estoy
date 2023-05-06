
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const StyledInputContainer = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledLabel = styled('h3')(({ theme }) => ({
  fontWeight: 'bold',
}));

const GeneralSettings = () => {
  // Datos de ejemplo, reemplaza esto con las configuraciones reales de tu aplicación
  const [maxAccompanists, setMaxAccompanists] = useState(10);
  const [specificMaxAccompanists, setSpecificMaxAccompanists] = useState({
    day: 'Viernes',
    hours: '20:00 - 22:00',
    max: 15,
  });

  const handleMaxAccompanistsChange = (event) => {
    setMaxAccompanists(event.target.value);
    // agregar el código para actualizar la configuración en tu base de datos o estado de Redux
  };

  const handleSpecificMaxAccompanistsChange = (event) => {
    setSpecificMaxAccompanists({
      ...specificMaxAccompanists,
      [event.target.name]: event.target.value,
    });
    //  agregar el código para actualizar la configuración en tu base de datos o estado de Redux
  };

  return (
    <Box>
      <Typography variant="h5" sx={{textAlign:"center", margin:"2vw"}}>
      Configuración General</Typography>
      <Box sx={{margin:"25vw", marginTop:5}}>
      <StyledInputContainer>
        <Typography variant='h6'>Número máximo de acompañantes por turno</Typography>
        <TextField
          type="number"
          value={maxAccompanists}
          onChange={handleMaxAccompanistsChange}
          fullWidth
        />
      </StyledInputContainer>
      <StyledInputContainer>
        <Typography variant='h6'>
          Número máximo de acompañantes en un turno específico
        </Typography>
        <div>
          <label>
            <Typography variant='h6'>Día:</Typography>
            <TextField
              type="text"
              name="day"
              value={specificMaxAccompanists.day}
              onChange={handleSpecificMaxAccompanistsChange}
              fullWidth
            />
          </label>
        </div>
        <div>
          <label>
            <Typography variant='h6'>Horario:</Typography>
            <TextField
              type="text"
              name="hours"
              value={specificMaxAccompanists.hours}
              onChange={handleSpecificMaxAccompanistsChange}
              fullWidth
            />
          </label>
        </div>
        <div>
          <label>
            <Typography variant='h6'>Máximo:</Typography>
            <TextField
              type="number"
              name="max"
              value={specificMaxAccompanists.max}
              onChange={handleSpecificMaxAccompanistsChange}
              fullWidth
            />
          </label>
        </div>
      </StyledInputContainer>
</Box>
    </Box>
  );
};

export default GeneralSettings;
