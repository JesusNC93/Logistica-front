// src/pages/AccesoDenegado.jsx (o donde tengas este componente)

import React from 'react';

function AccesoDenegado() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '10px' }}>
      <h1>Acceso Denegado</h1>
      <p>No tenés permiso para ver esta página.</p>
      <img
        src="https://i.makeagif.com/media/5-16-2019/4ivzFp.gif"
        alt="Acceso Denegado"
        style={{ width: '700px', maxWidth: '100%', marginTop: '20px' }}
      />
    </div>
  );
}

export default AccesoDenegado;
