import React from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { DecodedToken } from '../models/jwt/jwt.model';
import { useIonToast } from '@ionic/react';
import NavBar from '../components/Navbar';

interface ProtectedRouteWithNavBarProps extends RouteProps {
  roles: number[];
  component: React.ComponentType<any>;
}

const ProtectedRouteWithNavBar: React.FC<ProtectedRouteWithNavBarProps> = ({ component: Component, roles, ...rest }) => {
  const [presentT] = useIonToast();
  const dataUser = localStorage.getItem('UserData') ?? '';
  const location = useLocation();

  // Obtener la ruta anterior guardada
  const previousPath = localStorage.getItem('previousPath') || '/';

  let valueToken: number[] = [];

  try {
    const decodedToken = jwtDecode<DecodedToken>(dataUser);
    valueToken = decodedToken.roles;
  } catch (error) {
    console.error('Error decoding token:', error);
    return <Redirect to="/login" />;
  }

  const hasAccess = valueToken.some(role => roles.includes(role));
  const presentToast = () => {
    presentT({
      message: 'Acceso denegado!',
      duration: 2000,
      position: "middle",
      color: "danger"
    });
  };

  React.useEffect(() => {
    // Guardar la ruta actual en localStorage
    localStorage.setItem('previousPath', location.pathname);
  }, [location.pathname]);

  if (!hasAccess) {
    console.log(`Redirecting to previous path: ${previousPath}`);
    presentToast();
    return <Redirect to={previousPath} />;
  }

  return (
<NavBar component={<Component {...rest} />}  roles={valueToken} />
  );
};

export default ProtectedRouteWithNavBar;