import React from 'react';

const ProtectedPage = () => {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>This page should only be accessible to authenticated users.</p>
    </div>
  );
};

export default ProtectedPage;


//La idea detrás de la página protegida es asegurarse de que ciertas partes de tu aplicación solo sean accesibles para usuarios autenticados y que los usuarios no autenticados sean redirigidos a una página pública, como la página de inicio, donde pueden iniciar sesión o registrarse.

//Entonces, en resumen, el componente ProtectedPage en sí no tiene una funcionalidad específica en tu aplicación real, sino que se usa como ejemplo para demostrar cómo implementar y probar rutas protegidas en tu aplicación React. En tu proyecto, reemplazarás este componente con páginas reales que requieran autenticación.