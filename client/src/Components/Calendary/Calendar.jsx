import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import './Calendar.css';
import { useSelector } from 'react-redux'
const Calendar = () => {
  const [bookings, setBookings] = useState({});
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  let hours=[]
  const user=useSelector(state=>state.auth.user)
  if(user&&user.rol==="Supervisor"||user.isSuperAdmin){
   hours = Array.from({ length: 24 }, (_, i) => `${i}:00 - ${i===23?"00":i+1}:00`);

}
if(user&&user.rol==="Acompañante"
||user.isSuperCompanion ){
  hours = Array.from({ length: 12 }, (_, i) => `${i}:00 - ${i===23?"00":i+2}:00`);
}

  const toggleBooking = (day, hour) => {
    const key = `${day}_${hour}`;
    setBookings((prevBookings) => {
      if (prevBookings[key]) {
        const newBookings = { ...prevBookings };
        delete newBookings[key];
        return newBookings;
      } else {
        return { ...prevBookings, [key]: true };
      }
    });
  };

  const handleSelectShift = (shift) => {
    setSelectedShift(shift);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Container className="calendar-container">
      <table className="calendar-table">
        <thead>
          <tr>
            <th></th>
            {days.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td className="hour">{hour}</td>
              {days.map((day, index) => (
                <td
                  key={index}
                  className={`calendar-cell${bookings[`${day}_${hour}`] ? ' booked' : ''}`}
                  onClick={() => toggleBooking(day, hour)}
                >
                  {bookings[`${day}_${hour}`] ? 'Reservado' : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-4">Reserva de turno de voluntariado</h4>
      <Row className="mb-4">
        {shifts.map((shift) => (
          <Col key={shift.id}>
            <Button
              variant="outline-primary"
              className="mb-2"
              onClick={() => handleSelectShift(shift)}
            >
              {shift.available ? 'Disponible' : 'No disponible'}
            </Button>
          </Col>
        ))}
      </Row>

      {selectedShift && (
        <Modal show={openDialog} onHide={handleDialogClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reservar turno de voluntariado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de que deseas reservar el turno de {selectedShift.start} a {selectedShift.end}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDialogClose}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                // Lógica para reservar el turno de voluntariado
              }}
            >
              Reservar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
    );
  };
  
  export default Calendar;