import React from 'react'
import { Card } from 'react-bootstrap'
import Header from './Header'

const Error = () => {
  return (
    <div>
      <Header />
      <br />
      <Card.Img
        style={{ width: '50rem' }}
        variant="top"
        src={"https://i.ytimg.com/vi/YQfAmljQNBQ/maxresdefault.jpg"}
        alt="Foto del usuario"
      />
      <Card.Body></Card.Body>
      <h3>Pagina no encontrada</h3>
      <br />
      <br />
    </div>
  )
}

export default Error