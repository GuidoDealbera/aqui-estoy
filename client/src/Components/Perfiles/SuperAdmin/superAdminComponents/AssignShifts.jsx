import React, { useState } from 'react';

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

  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [selectedAccompanist, setSelectedAccompanist] = useState(null);

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
    <div>
      <h2>Asignar Turnos</h2>
      <div>
        <h3>Supervisores</h3>
        <select
          value={selectedSupervisor}
          onChange={(e) => setSelectedSupervisor(e.target.value)}
        >
          <option value="">Selecciona un supervisor</option>
          {supervisors.map((supervisor) => (
            <option key={supervisor.id} value={supervisor.id}>
              {supervisor.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Acompañantes</h3>
        <select
          value={selectedAccompanist}
          onChange={(e) => setSelectedAccompanist(e.target.value)}
        >
          <option value="">Selecciona un acompañante</option>
          {accompanists.map((accompanist) => (
            <option key={accompanist.id} value={accompanist.id}>
              {accompanist.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={assignAccompanist}>Asignar Acompañante</button>
    </div>
  );
};

export default AssignShifts;