import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


const AssignShifts = () => {
  // Datos de ejemplo, reemplaza esto con los datos reales de tu aplicación
  const supervisors = [
    { id: 1, name: 'Supervisor 1' },
    { id: 2, name: 'Supervisor 2' },
  ];

  const accompanists = [
    { id: 1, name: 'Acompañante 1', supervisorId: null },
    { id: 2, name: 'Acompañante 2', supervisorId: null },
  ];

  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [selectedAccompanist, setSelectedAccompanist] = useState('');

  const assignAccompanist = () => {
    if (selectedSupervisor && selectedAccompanist) {
      //  agregar el código para actualizar la asignación en tu base de datos o estado de Redux
      console.log(
        `Acompañante ${selectedAccompanist} asignado al supervisor ${selectedSupervisor}`
      );
    } else {
      console.log('Selecciona un supervisor y un acompañante');
    }
  };

  return (
    <Box>
      <h2>Asignar Turnos</h2>
      <Box marginBottom={2}>
        <FormControl fullWidth>
          <InputLabel>Supervisor</InputLabel>
          <Select
            value={selectedSupervisor}
            onChange={(e) => setSelectedSupervisor(e.target.value)}
            label="Supervisor"
          >
            <MenuItem value="">
              <em>Selecciona un supervisor</em>
            </MenuItem>
            {supervisors.map((supervisor) => (
              <MenuItem key={supervisor.id} value={supervisor.id}>
                {supervisor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box marginBottom={2}>
        <FormControl fullWidth>
          <InputLabel>Acompañante</InputLabel>
          <Select
            value={selectedAccompanist}
            onChange={(e) => setSelectedAccompanist(e.target.value)}
            label="Acompañante"
          >
            <MenuItem value="">
              <em>Selecciona un acompañante</em>
            </MenuItem>
            {accompanists.map((accompanist) => (
              <MenuItem key={accompanist.id} value={accompanist.id}>
                {accompanist.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button onClick={assignAccompanist} variant="contained" color="primary">
        Asignar Acompañante
      </Button>
    </Box>
  );
};

export default AssignShifts;
