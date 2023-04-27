import React, { useState } from 'react';

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
    <div>
      <h2>Configuración General</h2>
      <div>
        <h3>Número máximo de acompañantes por turno</h3>
        <input
          type="number"
          value={maxAccompanists}
          onChange={handleMaxAccompanistsChange}
        />
      </div>
      <div>
        <h3>Número máximo de acompañantes en un turno específico</h3>
        <label>
          Día:
          <input
            type="text"
            name="day"
            value={specificMaxAccompanists.day}
            onChange={handleSpecificMaxAccompanistsChange}
          />
        </label>
        <label>
          Horario:
          <input
            type="text"
            name="hours"
            value={specificMaxAccompanists.hours}
            onChange={handleSpecificMaxAccompanistsChange}
          />
        </label>
        <label>
          Máximo:
          <input
            type="number"
            name="max"
            value={specificMaxAccompanists.max}
            onChange={handleSpecificMaxAccompanistsChange}
          />
        </label>
      </div>
    </div>
  );
};

export default GeneralSettings;