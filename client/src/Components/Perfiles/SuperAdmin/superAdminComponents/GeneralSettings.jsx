
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

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
      <h2>Configuración General</h2>
      <StyledInputContainer>
        <StyledLabel>Número máximo de acompañantes por turno</StyledLabel>
        <TextField
          type="number"
          value={maxAccompanists}
          onChange={handleMaxAccompanistsChange}
          fullWidth
        />
      </StyledInputContainer>
      <StyledInputContainer>
        <StyledLabel>
          Número máximo de acompañantes en un turno específico
        </StyledLabel>
        <div>
          <label>
            <StyledLabel>Día:</StyledLabel>
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
            <StyledLabel>Horario:</StyledLabel>
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
            <StyledLabel>Máximo:</StyledLabel>
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
  );
};

export default GeneralSettings;
