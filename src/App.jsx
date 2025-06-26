import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import RutaPrivada from './components/RutaPrivada'; // ✅ IMPORTANTE
import Login from './pages/Login';
import Error from './components/Error';
import AccesoDenegado from './pages/AccesoDenegado';

import Home from './pages/Home';
import VerUsuarios from './pages/VerUsuarios';
import AgregarUsuario from './pages/AgregarUsuario';
import EditarUsuario from './pages/EditarUsuario';
import VerUsuario from './pages/VerUsuario';

import AdminMenu from './pages/AdminMenu';
import Compra from './pages/Compra';
import Recepcion from './pages/Recepcion';
import Stock from './pages/Stock';
import Deposito from './pages/Deposito';
import Preparacion from './pages/Preparacion';
import Expedicion from './pages/Expedicion';
import { LogisticaInversa } from './pages/LogisticaInversa';
import MiUsuario from './pages/MiUsuario';
import Atajos from './pages/Atajos';

function App() {
  return (
    // 🔁 CAMBIAR SEGÚN ENTORNO
    // Para desarrollo local con Vite:
    // <BrowserRouter>
    // // Para producción en Electron:
    <HashRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path='/' element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<RutaPrivada />}>
          <Route path='/home' element={<Home />} />
          <Route path='/Atajos' element={<Atajos />} />
          <Route path='/mi-usuario' element={<MiUsuario />} />
          <Route path='/acceso-denegado' element={<AccesoDenegado />} />
          <Route path='*' element={<Error />} />
          <Route path='/usuario' element={<VerUsuarios />} />
          <Route path='/usuario/agregar' element={<AgregarUsuario />} />
          <Route path='/usuario/editar/:id' element={<EditarUsuario />} />
          <Route path='/usuario/ver/:id' element={<VerUsuario />} />
          <Route path='/compra' element={<Compra />} />
          <Route path='/recepcion' element={<Recepcion />} />
          <Route path='/stock' element={<Stock />} />
          <Route path='/deposito' element={<Deposito />} />
          <Route path='/preparacion' element={<Preparacion />} />
          <Route path='/expedicion' element={<Expedicion />} />
          <Route path='/logistica-inversa' element={<LogisticaInversa />} />
          <Route path='/AdminMenu' element={<AdminMenu />} />
        </Route>
      </Routes>
    </HashRouter>
    // </BrowserRouter>
  );
}

export default App;
