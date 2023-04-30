import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

// Asume que tienes una función que obtiene los turnos de voluntariado
// import { getVolunteerShifts } from '../api';

export default function VolunteerShiftBooking() {
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Llama a la función para obtener los turnos de voluntariado y actualizar el estado
    // getVolunteerShifts().then((data) => setShifts(data));
  }, []);

  const handleSelectShift = (shift) => {
    setSelectedShift(shift);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Container>
        <Typography variant="h4">Reserva de turno de voluntariado</Typography>
        <Grid container spacing={2}>
          {shifts.map((shift) => (
            <Grid item key={shift.id}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleSelectShift(shift)}
              >
                {shift.available ? 'Disponible' : 'No disponible'}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>

      {selectedShift && (
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Reservar turno de voluntariado</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que deseas reservar el turno de {selectedShift.start} a{' '}
              {selectedShift.end}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                // Lógica para reservar el turno de voluntariado
              }}
              color="primary"
            >
              Reservar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
