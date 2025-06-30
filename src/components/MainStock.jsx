import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MainStock = () => {

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
  1- En inventario (me debe mostrar todo lo que tengo a disposicion)
  2- Busque de producto (Cuando escaneo, me debe redirigir a esa parte, y tambien lo deberia poder buscar desde esa opcion)
  3- Entradas de Stock (Ingreso manual, o ingreso por el numero de remito{se debería poder editar por cualquier cosa})
  4- Salidas de Stock (Son productos, que no lo puedo ingresar, ya sea por rotura o vencimiento)
  5- 

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
              <FaEdit className="me-2" /> Inventario
            </Button>
          </Col>

          <Col md={6} lg={7} className="mb-4">
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/recepcion')}
            >
              <FaEdit className="me-2" /> Busqueda de Producto
            </Button>
          </Col>

          <Col md={6} lg={7} className="mb-4">
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/stock/')}
            >
              <FaEdit className="me-2" /> Ubicaciones del Depósito
            </Button>
          </Col>

          <Col md={6} lg={6} className="mb-4" >
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/compra')}
            >
              <FaEdit className="me-2" /> Entradas de Stock
            </Button>
          </Col>
          
          <Col md={6} lg={6} className="mb-4" >
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/compra')}
            >
              <FaEdit className="me-2" /> Salidas de Stock
            </Button>
          </Col>

          <Col md={6} lg={6} className="mb-4" >
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/compra')}
            >
              <FaEdit className="me-2" /> Ajustes de Stock
            </Button>
          </Col>

          <Col md={6} lg={6} className="mb-4" >
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/compra')}
            >
              <FaEdit className="me-2" /> Stock por Vencer / Vencido
            </Button>
          </Col>

          <Col md={6} lg={6} className="mb-4" >
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/compra')}
            >
              <FaEdit className="me-2" /> Stock en Cuarentena o Bloqueado
            </Button>
          </Col>

          <Col md={6} lg={6} className="mb-4" >
            <Button
              variant="primary"
              size="lg"
              className="custom-btn w-100"
              onClick={() => navigate('/compra')}
            >
              <FaEdit className="me-2" /> KPI de Stock
            </Button>
          </Col>

        </Row>
      </Container>

    </div>
  )
}

export default MainStock