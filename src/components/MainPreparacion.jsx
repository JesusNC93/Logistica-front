import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MainPreparacion = () => {

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
              <FaEdit className="me-2" /> Órdenes de Preparación Pendientes
            </Button>
          </Col>

          <Col md={6} lg={7} className="mb-4">
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/recepcion')}
            >
              <FaEdit className="me-2" /> Preparar Pedido
            </Button>
          </Col>

          <Col md={6} lg={7} className="mb-4">
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/stock/')}
            >
              <FaEdit className="me-2" /> Doble Control
            </Button>
          </Col>

          <Col md={6} lg={7} className="mb-4" >
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/compra')}
            >
              <FaEdit className="me-2" /> Historial de Preparaciones
            </Button>
          </Col>

          <Col md={6} lg={7} className="mb-4" >
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/compra')}
            >
              <FaEdit className="me-2" /> Métricas de Preparación
            </Button>
          </Col>

        </Row>
      </Container>
    </div>
  )
}

export default MainPreparacion