import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MainExpedicion = () => {

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
              <FaEdit className="me-2" /> Control de Salida
            </Button>
          </Col>

          <Col md={6} lg={7} className="mb-4">
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/recepcion')}
            >
              <FaEdit className="me-2" /> Generar Remito / Documento
            </Button>
          </Col>

          <Col md={6} lg={7} className="mb-4">
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/stock/')}
            >
              <FaEdit className="me-2" /> Historial de Expediciones
            </Button>
          </Col>

          <Col md={6} lg={7} className="mb-4" >
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/compra')}
            >
              <FaEdit className="me-2" /> Cancelar o Reprogramar
            </Button>
          </Col>

          <Col md={6} lg={7} className="mb-4" >
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/compra')}
            >
              <FaEdit className="me-2" /> Monitor de Repartos
            </Button>
          </Col>

          <Col md={6} lg={7} className="mb-4" >
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/compra')}
            >
              <FaEdit className="me-2" /> Reeimprimir Factura/Remito
            </Button>
          </Col>

          <Col md={6} lg={7} className="mb-4" >
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/compra')}
            >
              <FaEdit className="me-2" /> Generar hoja de ruta
            </Button>
          </Col>

          <Col md={6} lg={7} className="mb-4" >
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/compra')}
            >
              <FaEdit className="me-2" /> Reimprimir hoja de ruta
            </Button>
          </Col>

        </Row>
      </Container>
    </div>
  )
}

export default MainExpedicion