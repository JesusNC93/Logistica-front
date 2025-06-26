import { useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';
import { URL_LOGIN } from '../constants/constantes';
import { useAuth } from '../context/authContext';

const MainLogin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('jesusnc');
    const [pass, setPass] = useState('1234');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // <--- Estado de carga
    const { setUser: setAuthUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // <--- Activar estado de carga
        setError(''); // <--- Limpiar errores previos

        try {
            const response = await axios.post(URL_LOGIN, {
                userName: user,
                password: pass
            });

            const usuario = response.data.user;
            const token = response.data.token;

            // Guardar en localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(usuario));
            setAuthUser(usuario);

            navigate('/home');
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError(err.response.data.error);
            } else {
                setError('Error al conectar con el servidor');
            }
        } finally {
            setIsLoading(false); // <--- Desactivar estado de carga
        }

        // Solo resetear si no hay error y no se redirigió
        if (!error) {
            e.target.reset();
            setUser('jesusnc');
            setPass('1234');
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
                                        disabled={isLoading} // <--- Deshabilitar cuando está cargando
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
                                        disabled={isLoading} // <--- Deshabilitar cuando está cargando
                                    />
                                </Form.Group>
                                <br />
                                {error && <div className="text-danger">{error}</div>}
                                <Button 
                                    type="submit" 
                                    className="btn-submit w-100"
                                    disabled={isLoading} // <--- Deshabilitar botón
                                >
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