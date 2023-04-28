import React, { useRef } from 'react';
import Papa from 'papaparse';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';


const CsvImportExport = () => {
  const fileInput = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log('Datos del archivo CSV importado:', results.data);
        // agregar el código para guardar los datos importados en tu base de datos o estado de Redux
      },
    });
  };

  const handleExportCsv = () => {
    // agregar el código para obtener los datos de los usuarios que quieres exportar
    const data = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 28 },
    ];

    const csv = Papa.unparse(data);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'usuarios.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // implementar la lógica para crear el usuario, como llamar a una API o usar acciones de Redux
    console.log(userData);
  };

  return (
    <Box>
      <h2>Importar/Exportar CSV</h2>
      <form onSubmit={handleSubmit}>
        <Box marginBottom={2}>
          <input
            type="file"
            accept=".csv"
            ref={fileInput}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="csv-input"
          />
          <label htmlFor="csv-input">
            <TextField
              label="Seleccionar archivo CSV"
              fullWidth
              InputProps={{ readOnly: true }}
              onClick={(e) => (fileInput.current ? fileInput.current.click() : null)}
            />
          </label>
        </Box>
        <Box marginBottom={2}>
          <Button variant="contained" onClick={handleExportCsv} color="primary">
            Exportar CSV
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CsvImportExport;
