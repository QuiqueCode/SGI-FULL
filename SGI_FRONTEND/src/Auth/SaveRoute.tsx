import React from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { DecodedToken } from '../models/jwt/jwt.model';
import { useIonToast } from '@ionic/react';

interface ProtectedRouteProps extends RouteProps {
  roles: number[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles, ...routeProps }) => {
  const [presentT] = useIonToast();
  const dataUser = localStorage.getItem('UserData') ?? '';
  const location = useLocation();

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
      color:"danger"
    });
  };

  if (!hasAccess) {
    console.log(`Redirecting to /RolSelector from ${location.pathname}`);
    presentToast();
    return <Redirect to="/RolSelector" />;
  }

  return <Route {...routeProps} />;
};

export default ProtectedRoute;
