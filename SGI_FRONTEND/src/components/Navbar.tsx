import React, { ReactNode, useRef, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import {jwtDecode} from 'jwt-decode';
import { DecodedToken } from '../models/jwt/jwt.model';
import { bodyOutline, buildOutline, calendar, cogOutline, constructOutline, exitOutline, eyeOutline, personCircleOutline, readerOutline } from 'ionicons/icons';
import './ExploreContainer'


interface NavBarProps {
  component: React.ReactNode;
  roles: number[]; // Roles del usuario
}

const NavBar: React.FC<NavBarProps> = ({ component, roles }) => {
  const history = useHistory();
  const [style, setStyles] = useState('');

  const goUser = (user: string, route: string) => {
    setStyles(user);
    history.push(route);
  };

  const menuItems = [
    { role: 2, label: 'Usuario', route: '/UserIncidentL', icon: personCircleOutline },
    { role: 3, label: 'Encargado', route: '/incidentManagerList', icon: readerOutline },
    { role: 4, label: 'Técnico', route: '/TechIncidentsList', icon: buildOutline },
    { role: 5, label: 'Supervisor', route: '/SupervisorCloseList', icon: eyeOutline },
    { role: 1, label: 'Administrador', route: '/adminView', icon: cogOutline },
  ];

  return (
    <>
      <IonMenu contentId="main-content"  >
        <IonHeader >
          <IonToolbar  >
            <IonTitle>Opciones de usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding"  >
          {menuItems
            .filter(item => roles.includes(item.role))
            .map((item, index) => (
              <div
                key={index}
                className={style === item.label.toLowerCase() ? 'menuContent' : 'menuContent2'}
                onClick={() => goUser(item.label.toLowerCase(), item.route)}
              >
                <IonMenuToggle style={{ display: 'flex', alignItems: 'center' }}>
                  <IonIcon icon={item.icon} className="icon" style={{ marginRight: '10px' }} />
                  <span>{item.label}</span>
                </IonMenuToggle>
              </div>
            ))}
          <div className="menuContent2">
            <IonMenuToggle style={{ display: 'flex', alignItems: 'center' }} onClick={() => goUser('cerrar', '/login')} >
              <IonIcon icon={exitOutline} className="icon" style={{ marginRight: '10px' }}  />
              <span>Cerrar sesión</span>
            </IonMenuToggle>
          </div>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content"   >
        <IonHeader >
          <IonToolbar >
            <IonButtons slot="start" >
              <IonMenuButton ></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent >{component}</IonContent>
      </IonPage>
    </>
  );
};

export default NavBar;