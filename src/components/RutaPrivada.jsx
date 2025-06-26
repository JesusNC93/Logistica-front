import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function RutaPrivada() {
  const { user: usuario, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Cargando...</div>; // Evita redirecciones mientras carga

  if (!usuario) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  // ❗️ Cambiar aquí
  const tipoUsuario = usuario?.tipoDeUsuario;

  const rutasPorRol = {
    Administrador: '*',
    Recepcionista: ['/acceso-denegado'],
    Compras: ['/acceso-denegado'],
    Calidad: ['/acceso-denegado'],
    Depósito: ['/acceso-denegado'],
    Seguridad: ['/acceso-denegado'],
    Supervisión: ['/acceso-denegado'],
  };

  const rutaActual = location.pathname;

  if (rutaActual.startsWith('/home/')) {
    if (
      [
        'Administrador',
        'Recepcionista',
        'Compras',
        'Calidad',
        'Depósito',
        'Seguridad',
        'Supervisión',
      ].includes(tipoUsuario)
    ) {
      return <Outlet />;
    } else {
      return <Navigate to="/acceso-denegado" replace />;
    }
  }

  const rutasPermitidas = rutasPorRol[tipoUsuario];

  if (rutasPermitidas === '*') {
    return <Outlet />;
  }

  if (Array.isArray(rutasPermitidas) && rutasPermitidas.includes(rutaActual)) {
    return <Outlet />;
  }

  return <Navigate to="/acceso-denegado" replace />;
}

export default RutaPrivada;
