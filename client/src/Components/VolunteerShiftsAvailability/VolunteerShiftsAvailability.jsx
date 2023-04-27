import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VolunteerShiftsAvailability = () => {
  const [supervisorShifts, setSupervisorShifts] = useState([]);
  const [companionShifts, setCompanionShifts] = useState([]);

//función asíncrona que hace dos solicitudes HTTP para obtener los turnos de supervisores y acompañantes.

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const supervisorResponse = await axios.get('/getSupervisorShift');
        const companionResponse = await axios.get('/getCompanionShift');
        setSupervisorShifts(supervisorResponse.data);
        setCompanionShifts(companionResponse.data);
      } catch (error) {
        console.error('Error fetching shifts:', error);
      }
    };
    fetchShifts();
  }, []);


// toma un turno y determina el color de fondo según la cantidad de voluntarios en ese turno.

  const getShiftColor = (shift) => {
    const volunteerCount = shift.volunteers.length;
    if (volunteerCount === 0) {
      return 'red';
    } else if (volunteerCount >= 1 && volunteerCount <= 2) {
      return 'yellow';
    } else {
      return 'none';
    }
  };


//renderizado del componente, se muestran los turnos de supervisores y acompañantes con sus respectivos colores de fondo.

  return (
    <div>
      <h2>Turnos de Supervisores</h2>
      {supervisorShifts.map((shift) => (
        <div key={shift.id} style={{ backgroundColor: getShiftColor(shift) }}>
          {shift.time} - {shift.volunteers.length} voluntarios
        </div>
      ))}
      <h2>Turnos de Acompañantes</h2>
      {companionShifts.map((shift) => (
        <div key={shift.id} style={{ backgroundColor: getShiftColor(shift) }}>
          {shift.time} - {shift.volunteers.length} voluntarios
        </div>
      ))}
    </div>
  );
};

export default VolunteerShiftsAvailability;