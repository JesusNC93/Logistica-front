import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";
import {
  URL_USUARIOS,
  URL_USUARIOS_CREAR,
} from "../constants/constantes";
import { useNavigate } from "react-router-dom";

const MainAgregarUsuario = () => {
  const navigate = useNavigate();

  // Estado para manejar los datos del formulario
  const initialState = {
    userName: '',
    ApyNom: '',
    pass: '',
    interno: '',
    idTipoUsuario: '',
    idGenero: '',
    idEstadoCivil: '',
    informacion: '',
  };

  const [datosForm, setDatosForm] = useState(initialState);
  const [tiposDeUsuarios, setTiposDeUsuarios] = useState([]); // Tipo de usuario
  const [generos, setGeneros] = useState([]); // Género
  const [estadoCiviles, setEstadoCiviles] = useState([]); // Estado civil

  

  // Cargar datos al iniciar
  useEffect(() => {
    getTipoUsuario();
    getGenero();
    getEstadoCivil();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      let response = await axios.post(URL_USUARIOS_CREAR, {
        userName: datosForm.userName,
        ApyNom: datosForm.ApyNom,
        pass: datosForm.pass,
        interno: datosForm.interno ? parseInt(datosForm.interno) : null,
        idTipoUsuario: datosForm.idTipoUsuario ? parseInt(datosForm.idTipoUsuario) : null,
        idGenero: datosForm.idGenero ? parseInt(datosForm.idGenero) : null,
        idEstadoCivil: datosForm.idEstadoCivil ? parseInt(datosForm.idEstadoCivil) : null,
        informacion: datosForm.informacion
      });

      if (response.status === 200) {
        alert("Usuario agregado correctamente");
        navigate("/usuario");
      }
    } catch (error) {
      alert("Error al agregar usuario");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setDatosForm({ ...datosForm, [e.target.name]: e.target.value });
  };

  return (
    <Container>

      <Form onSubmit={handleSubmit}>

        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" name="userName" value={datosForm.userName} onChange={handleChange} required maxLength={20} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Apellido y Nombre</Form.Label>
              <Form.Control type="text" name="ApyNom" value={datosForm.ApyNom} onChange={handleChange} required maxLength={20} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="text" name="pass" value={datosForm.pass} onChange={handleChange} required maxLength={20} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Interno</Form.Label>
              <Form.Control type="text" name="interno" value={datosForm.interno} onChange={handleChange} required maxLength={20} />
            </Form.Group>

          </Col>

          <Col md={6}>

            <Form.Group>
              <Form.Label>Genero</Form.Label>
              <Form.Control as="select" onChange={handleChange} name="idGenero" value={datosForm.idGenero}>
                <option value="" disabled>Seleccione Genero</option>
                {generos.map(generos => (
                  <option key={generos.id} value={generos.id}>
                    {generos.nombreGenero}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Tipo de Usuario</Form.Label>
              <Form.Control as="select" onChange={handleChange} name="idTipoUsuario" value={datosForm.idTipoUsuario}>
                <option value="" disabled>Seleccione Tipo de Usuario</option>
                {tiposDeUsuarios.map(tiposDeUsuarios => (
                  <option key={tiposDeUsuarios.id} value={tiposDeUsuarios.id}>
                    {tiposDeUsuarios.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Estado Civil</Form.Label>
              <Form.Control as="select" onChange={handleChange} name="idEstadoCivil" value={datosForm.idEstadoCivil}>
                <option value="" disabled>Seleccione Estado Civil</option>
                {estadoCiviles.map(estadoCiviles => (
                  <option key={estadoCiviles.id} value={estadoCiviles.id}>
                    {estadoCiviles.nombreEstadoCivil}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label>Informacion del usuario</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            name="informacion"
            maxLength={500}
            placeholder="Escriba una descripción (máximo 500 caracteres)"
            value={datosForm.informacion}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Máximo 500 caracteres.
          </Form.Text>
        </Form.Group>

        <br />

        <Row>
          <Button type='submit' variant='success'>Agregar</Button>
        </Row>
        <br />

        <Row>
          <Link to={"/usuario/"} className='btn btn-primary'>Volver</Link>
        </Row>

        <br />


      </Form>

    </Container>
  );
};

export default MainAgregarUsuario;
