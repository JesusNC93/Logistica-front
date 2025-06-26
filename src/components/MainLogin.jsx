import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';
import { URL_LOGIN } from '../constants/constantes';
import { useAuth } from '../context/authContext';

const MainLogin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // ✅ Cargar último usuario guardado al iniciar el componente
  useEffect(() => {
    const lastUser = localStorage.getItem('lastUser');
    if (lastUser) setUser(lastUser);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(URL_LOGIN, {
        userName: user,
        password: pass
      });

      const usuario = response.data.user;
      const token = response.data.token;

      // ✅ Guardar usuario usado en localStorage
      localStorage.setItem('lastUser', user);

      login(usuario, token);
      navigate('/home');
    } catch (err) {
      if (err.response?.status === 401) {
        setError(err.response.data.error);
      } else {
        setError('Error al conectar con el servidor');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6} lg={4}>
            <div className="login-card">
              <div className="login-icon">
                <FaUserCircle size={90} />
              </div>
              <h1 className="text-center login-title">Bienvenido</h1>
              <br />
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 text-start">
                  <Form.Label className="input-label">Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu usuario"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="input-field"
                    disabled={isLoading}
                  />
                </Form.Group>
                <Form.Group className="mb-3 text-start">
                  <Form.Label className="input-label">Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="input-field"
                    disabled={isLoading}
                  />
                </Form.Group>
                <br />
                {error && <div className="text-danger">{error}</div>}
                <Button type="submit" className="btn-submit w-100" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Ingresando...
                    </>
                  ) : (
                    'Ingresar'
                  )}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainLogin;
