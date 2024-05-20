import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonImg, IonPage, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInputPasswordToggle, IonLoading } from '@ionic/react';
import logo from '../../assets/circleLogo.png'
import './LoginStyle.css'
import axios from 'axios';
import { useIonLoading } from '@ionic/react';


const consulta = async (form: object, present: any) => {
  try {
    await axios.post('http://localhost:3000/login', form);
    console.log("Inicio de sesión exitoso");
    present({
      message: "Iniciando sesion...",
      duration: 1500,
    });
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
  }
};

const Login: React.FC = () => {
  const [present, dismiss] = useIonLoading();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await consulta(formData, present);
  };

  return (
    <IonContent className='login-page ion-padding'>
      <div className='login-page__image'>
        <img src={logo} alt="" style={{ width: '500px', maxWidth: '250px' }} />
      </div>

      <form onSubmit={handleSubmit} style={{ paddingTop: '50px' }}>
        <span>Correo</span>
        <IonInput
          class="custom"
          type="email"
          name="email"
          value={formData.email}
          onIonInput={handleInputChange}
          required
          style={{ marginBottom: '50px', marginTop: '10px' }}
        />

        <span>Contraseña</span>
        <IonInput
          class="custom"
          type="password"
          name="password"
          value={formData.password}
          onIonInput={handleInputChange}
          required
          style={{ marginBottom: '20px', marginTop: '10px' }}
        />

        <IonButton shape="round" expand="block" type='submit' style={{ marginTop: '50px' }}>
          Iniciar sesión
        </IonButton>
      </form>
    </IonContent>
  );
};

export default Login;


/**   <IonPage>
  <IonContent className="ion-padding">
    <IonGrid className="ion-justify-content-center ion-align-items-center">
      <IonRow className="ion-align-items-center">
        <IonCol size="12" className="ion-text-center">
          <IonImg src={logo} style={{ borderRadius: '50%', border: '2px solid black', }} />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput type="email" maxlength={20}></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput type="password" maxlength={20}></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="12" className="ion-text-center">
          <IonButton expand="block">Iniciar Sesión</IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  </IonContent>
</IonPage> */


