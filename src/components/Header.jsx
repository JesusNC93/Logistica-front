import React, { useState, useEffect } from 'react';
import {
  Container,
  Navbar,
  Nav,
  Row,
  Col
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  FaTruck,
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
  FaUser,
  FaStar 
} from 'react-icons/fa';

import axios from 'axios';
import '../css/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.userName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleDragStart = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar className="header-top" variant="dark">
        <Container fluid className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <FaTruck size={22} className="me-2 text-white" />
            <span className="header-title">Logistic Proyect</span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <FaUserCircle size={20} className="text-white" />
            <span className="header-user">{userName || 'Usuario Activo'}</span>
            <button className="logout-button" onClick={handleLogout} onDragStart={handleDragStart}>
              <FaSignOutAlt className="me-1" /> Cerrar Sesión
            </button>
          </div>
        </Container>
      </Navbar>

      <Navbar className="header-bottom" variant="dark">
        <Container fluid>
          <Row className="w-100 justify-content-center py-2">
            <Col xs={12} md={4} className="mb-2">
              <Nav.Link
                className="header-button text-center"
                onClick={() => navigate('/Atajos')}
                onDragStart={handleDragStart}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <FaStar /> Atajos
                </span>
              </Nav.Link>
            </Col>

            <Col xs={12} md={4} className="mb-2">
              <Nav.Link
                className="header-button text-center"
                onClick={() => navigate('/home')}
                onDragStart={handleDragStart}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <FaHome /> Menú Principal
                </span>
              </Nav.Link>
            </Col>

            <Col xs={12} md={4} className="mb-2">
              <Nav.Link
                className="header-button text-center"
                onClick={() => navigate('/mi-usuario')}
                onDragStart={handleDragStart}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <FaUser /> Mi Usuario
                </span>
              </Nav.Link>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
