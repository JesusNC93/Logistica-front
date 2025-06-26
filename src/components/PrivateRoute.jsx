import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ element: Element, roles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to='/' />;
  if (roles && !roles.includes(user.rol)) return <Navigate to='/home' />;

  return <Element />;
};

export default PrivateRoute;
