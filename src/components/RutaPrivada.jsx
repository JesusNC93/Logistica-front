import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function RutaPrivada() {
  const { user: usuario, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Cargando...</div>; // Evita redirecciones mientras carga

  if (!usuario) {
    // Si no estás logueado, redirige a la página de login
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  // Definimos las rutas permitidas para cada rol
  const rutasPorRol = {
    Administrador: '*',
    Recepcionista: [ '/acceso-denegado'],
    Compras: ['/acceso-denegado'],
    Calidad: ['/acceso-denegado'],
    Depósito: ['/acceso-denegado'],
    Seguridad: ['/acceso-denegado'],
    Supervisión: ['/acceso-denegado'],
  };

  const rutaActual = location.pathname;
  const tipoUsuario = usuario?.rol;
  
  // Verificar si la ruta actual comienza con /gestion/ para manejo especial
  if (rutaActual.startsWith('/gestion/')) {
    // Si es una ruta de gestión, permitirla para todos los roles que tengan acceso
    if (['Administrador', 'Recepcionista', 'Compras', 'Calidad',
      'Depósito', 'Seguridad', 'Supervisión'
    ].includes(tipoUsuario)) {
      return <Outlet />;
    } else {
      return <Navigate to="/acceso-denegado" replace />;
    }
  }
  
  const rutasPermitidas = rutasPorRol[tipoUsuario];

  if (rutasPermitidas === '*') {
    return <Outlet />; // Si el rol tiene acceso a todas las rutas
  }

  if (Array.isArray(rutasPermitidas) && rutasPermitidas.includes(rutaActual)) {
    return <Outlet />; // Si la ruta está permitida para el rol
  }

  // Si la ruta no está permitida, redirige a la página de acceso denegado
  return <Navigate to="/acceso-denegado" replace />;
}

export default RutaPrivada;