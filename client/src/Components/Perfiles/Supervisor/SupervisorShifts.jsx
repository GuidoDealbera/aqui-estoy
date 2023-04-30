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

// Asume que tienes una función que obtiene los turnos de voluntariado y los voluntarios inscritos
// import { getVolunteerShifts } from '../api';

export default function SupervisorShifts() {
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

  const getShiftColor = (volunteerCount) => {
    if (volunteerCount === 0) {
      return 'red';
    } else if (volunteerCount >= 1 && volunteerCount <= 2) {
      return 'yellow';
    }
    return 'transparent';
  };

  return (
    <Box>
      <Container>
        <Typography variant="h4">Supervisión de turnos de voluntariado</Typography>
        <Grid container spacing={2}>
          {shifts.map((shift) => (
            <Grid item key={shift.id}>
              <Button
                variant="outlined"
                onClick={() => handleSelectShift(shift)}
                style={{ backgroundColor: getShiftColor(shift.volunteerCount) }}
              >
                {shift.start} - {shift.end}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>

      {selectedShift && (
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Voluntarios inscritos</DialogTitle>
          <DialogContent>
            {selectedShift.volunteers.map((volunteer) => (
              <Typography key={volunteer.id}>
                <a href={`/profile/${volunteer.id}`}>{volunteer.name}</a>
              </Typography>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
