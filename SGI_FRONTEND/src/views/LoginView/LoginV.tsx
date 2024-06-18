import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonImg, IonPage, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInputPasswordToggle, IonLoading } from '@ionic/react';
import logo from '../../assets/circleLogo.png'
import './LoginStyle.css'
import axios from 'axios';
import { useIonLoading } from '@ionic/react';
import { LoginViewModel } from '../../viewModels/loginViewModel/loginViewModel';




const Login: React.FC = () => {
  const {present,formData,handleInputChange,handleSubmit}=LoginViewModel()

  return (
    <IonContent className='login-page ion-padding'>
      <div className='login-page__image'>
        <img src={logo} alt="" style={{ width: '500px', maxWidth: '250px' }} />
      </div>

      <form onSubmit={handleSubmit} style={{ paddingTop: '10px' }}>
        <span style={{color:'white'}}>Correo</span>
        <IonInput
          class="custom"
          type="email"
          name="email"
          value={formData.email}
          onIonInput={handleInputChange}
          required
          style={{ marginBottom: '50px', marginTop: '10px' }}
        />

        <span style={{color:'white'}}>Contraseña</span>
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




