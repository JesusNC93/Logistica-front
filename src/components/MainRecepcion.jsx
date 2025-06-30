import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MainRecepcion = () => {

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
                <Col md={6} lg={6} className="mb-4" >
                  <Button
                    variant="primary"
                    size="lg"
                    className="custom-btn w-100"
                    onClick={() => navigate('/compra')}
                  >
                    <FaEdit className="me-2" /> Turnos Programados
                  </Button>
                </Col>
      
                <Col md={6} lg={6} className="mb-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="custom-btn w-100"
                    onClick={() => navigate('/recepcion')}
                  >
                    <FaEdit className="me-2" /> Iniciar Recepción
                  </Button>
                </Col>
      
                <Col md={6} lg={6} className="mb-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="custom-btn w-100"
                    onClick={() => navigate('/stock/')}
                  >
                    <FaEdit className="me-2" /> Detalle de Productos Recibidos
                  </Button>
                </Col>

                <Col md={6} lg={6} className="mb-4" >
                  <Button
                    variant="primary"
                    size="lg"
                    className="custom-btn w-100"
                    onClick={() => navigate('/compra')}
                  >
                    <FaEdit className="me-2" /> Subir Fotos de Recepción
                  </Button>
                </Col>
      
                <Col md={6} lg={6} className="mb-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="custom-btn w-100"
                    onClick={() => navigate('/recepcion')}
                  >
                    <FaEdit className="me-2" /> Recepciones con Desvíos
                  </Button>
                </Col>
      
                <Col md={6} lg={6} className="mb-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="custom-btn w-100"
                    onClick={() => navigate('/stock/')}
                  >
                    <FaEdit className="me-2" /> Finalizar / Confirmar Recepción
                  </Button>
                </Col>

                <Col md={6} lg={6} className="mb-4" >
                  <Button
                    variant="primary"
                    size="lg"
                    className="custom-btn w-100"
                    onClick={() => navigate('/compra')}
                  >
                    <FaEdit className="me-2" /> Historial de Recepciones
                  </Button>
                </Col>
      
                <Col md={6} lg={6} className="mb-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="custom-btn w-100"
                    onClick={() => navigate('/recepcion')}
                  >
                    <FaEdit className="me-2" /> Buscar Recepción
                  </Button>
                </Col>
      
                <Col md={6} lg={6} className="mb-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="custom-btn w-100"
                    onClick={() => navigate('/stock/')}
                  >
                    <FaEdit className="me-2" /> Trazabilidad de Lotes
                  </Button>
                </Col>
      
              </Row>
            </Container>
    </div>
  )
}

export default MainRecepcion