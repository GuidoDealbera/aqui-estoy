import React, { useRef } from 'react';
import Papa from 'papaparse';

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

  return (
    <div>
      <h2>Importar/Exportar CSV</h2>
      <input
        type="file"
        accept=".csv"
        ref={fileInput}
        onChange={handleFileUpload}
      />
      <button onClick={handleExportCsv}>Exportar CSV</button>
    </div>
  );
};

export default CsvImportExport;