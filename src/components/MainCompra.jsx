import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const MainCompra = () => {

  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.ApyNom);
    }
  }, []);

  /*
  1- Seguir las vistas del justinmind (Compra, elaboracion de orden de compra, confirmacion de la orden)
  2- Debo poder ver todo el historial de compras por orden de elaboracion
  */

  return (
    <div>
      <Container className="mt-5 text-center">
              <Row className="justify-content-center">

                <Col md={6} lg={7} className="mb-4" >
                  <Button
                    variant="primary"
                    size="lg"
                    className="custom-btn w-100"
                    onClick={() => navigate('/compra')}
                  >
                    <FaEdit className="me-2" /> Generar orden de Compra
                  </Button>
                </Col>
      
                <Col md={6} lg={7} className="mb-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="custom-btn w-100"
                    onClick={() => navigate('/recepcion')}
                  >
                    <FaEdit className="me-2" /> Historial de compras
                  </Button>
                </Col>      

                <Col md={6} lg={7} className="mb-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="custom-btn w-100"
                    onClick={() => navigate('/recepcion')}
                  >
                    <FaEdit className="me-2" /> Precios por Producto
                  </Button>
                </Col>    

                <Col md={6} lg={7} className="mb-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="custom-btn w-100"
                    onClick={() => navigate('/recepcion')}
                  >
                    <FaEdit className="me-2" /> Órdenes Rechazadas / Canceladas
                  </Button>
                </Col>

                <Col md={6} lg={7} className="mb-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="custom-btn w-100"
                    onClick={() => navigate('/recepcion')}
                  >
                    <FaEdit className="me-2" /> Reorden automática o sugerida
                  </Button>
                </Col>

                <Col md={6} lg={7} className="mb-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="custom-btn w-100"
                    onClick={() => navigate('/recepcion')}
                  >
                    <FaEdit className="me-2" /> Envío / Confirmación al proveedor
                  </Button>
                </Col>

                <Col md={6} lg={7} className="mb-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="custom-btn w-100"
                    onClick={() => navigate('/recepcion')}
                  >
                    <FaEdit className="me-2" /> Descarga de OC / PDF / Excel/ Impresión
                  </Button>
                </Col>


      
              </Row>
            </Container>
    </div>
  )
}

export default MainCompra