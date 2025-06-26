import React, { useEffect, useState } from 'react';
import { Form, FormControl, FormGroup, Col, Row, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  URL_USUARIOS_EDITAR,
  URL_USUARIOS_VER
} from '../constants/constantes';

const MainEditarUsuarios = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialState = {
    userName: '',
    ApyNom: '',
    pass: '',
    interno: '',
    idTipoUsuario: '',
    idGenero: '',
    idEstadoCivil: '',
    disponible: true,
    img: '',
    informacion: ''
  };

  const [datosForm, setDatosForm] = useState(initialState);
  const [tiposDeUsuarios, setTiposDeUsuarios] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [estadoCiviles, setEstadoCiviles] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(URL_USUARIOS_VER + id);
      if (response.status === 200) {
        const user = response.data[0];
        setDatosForm({
          userName: user.userName || '',
          ApyNom: user.ApyNom || '',
          pass: user.pass || '',
          interno: user.interno || '',
          idTipoUsuario: user.idTipoUsuario || '',
          idGenero: user.idGenero || '',
          idEstadoCivil: user.idEstadoCivil || '',
          disponible: Boolean(user.disponible),
          img: user.img || '',
          informacion: user.informacion || ''
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'disponible') {
      setDatosForm({ ...datosForm, disponible: value === 'true' });
    } else {
      setDatosForm({ ...datosForm, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(URL_USUARIOS_EDITAR + id, {
        ...datosForm,
        interno: parseInt(datosForm.interno),
        idTipoUsuario: parseInt(datosForm.idTipoUsuario),
        idGenero: parseInt(datosForm.idGenero),
        idEstadoCivil: parseInt(datosForm.idEstadoCivil),
        disponible: datosForm.disponible
      });

      if (response.status === 200) {
        alert("Usuario actualizado con éxito");
        navigate("/usuario");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error al actualizar usuario");
    }
  };

  useEffect(() => {
    getData();
    axios.get(URL_TIPO_USUARIO).then(res => setTiposDeUsuarios(res.data));
    axios.get(URL_GENERO).then(res => setGeneros(res.data));
    axios.get(URL_ESTADO_CIVIL).then(res => setEstadoCiviles(res.data));
  }, []);

  return (
    <div className='d-flex justify-content-center'>
      <Card style={{ width: '50rem' }}>
        <Card.Img
          variant="top"
          src={datosForm.img || "https://i.ytimg.com/vi/YQfAmljQNBQ/maxresdefault.jpg"}
          alt="Foto del usuario"
        />
        <Card.Body>
          <Card.Title className='text-center'><h3>Editar Usuario</h3></Card.Title>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Row>
                <Col md={6}>
                  <Form.Label>Usuario</Form.Label>
                  <FormControl type='text' name='userName' value={datosForm.userName} onChange={handleChange} required maxLength={20} />
                  <br />
                  <Form.Label>Apellido y Nombre</Form.Label>
                  <FormControl type='text' name='ApyNom' value={datosForm.ApyNom} onChange={handleChange} required maxLength={50} />
                  <br />
                  <Form.Label>Contraseña</Form.Label>
                  <FormControl type='text' name='pass' value={datosForm.pass} onChange={handleChange} required maxLength={20} />
                  <br />
                  <Form.Label>Disponible</Form.Label>
                  <Form.Select name="disponible" value={datosForm.disponible.toString()} onChange={handleChange}>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </Form.Select>
                </Col>

                <Col md={6}>
                  <Form.Label>Interno</Form.Label>
                  <FormControl type='number' name='interno' value={datosForm.interno} onChange={handleChange} />
                  <br />
                  <Form.Label>Tipo de Usuario</Form.Label>
                  <Form.Select name='idTipoUsuario' value={datosForm.idTipoUsuario} onChange={handleChange}>
                    <option disabled value="">Seleccionar tipo...</option>
                    {tiposDeUsuarios.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                    ))}
                  </Form.Select>
                  <br />
                  <Form.Label>Género</Form.Label>
                  <Form.Select name='idGenero' value={datosForm.idGenero} onChange={handleChange}>
                    <option disabled value="">Seleccionar género...</option>
                    {generos.map((gen) => (
                      <option key={gen.id} value={gen.id}>{gen.nombreGenero}</option>
                    ))}
                  </Form.Select>
                  <br />
                  <Form.Label>Estado Civil</Form.Label>
                  <Form.Select name='idEstadoCivil' value={datosForm.idEstadoCivil} onChange={handleChange}>
                    <option disabled value="">Seleccionar estado civil...</option>
                    {estadoCiviles.map((ec) => (
                      <option key={ec.id} value={ec.id}>{ec.nombreEstadoCivil}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Form.Label>Información de contacto</Form.Label>
                  <FormControl
                    as='textarea'
                    rows={6}
                    name='informacion'
                    value={datosForm.informacion}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <br />
              <Row className='text-center'>
                <Col>
                  <Button type='submit' className='btn-success me-2'>Guardar Edición</Button>
                  <Link to={"/usuario/"} className='btn btn-primary'>Volver</Link>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MainEditarUsuarios;
