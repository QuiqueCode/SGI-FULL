import { IonButton, IonIcon } from '@ionic/react'
import React from 'react'
import { AdminSelectorVM } from '../../viewModels/AdminSelectorVM/AdminSelectorVM'
import NavBar from '../../components/Navbar';

export default function View() {
    const {goBack, goCreateUser,goToRol, goToUserList}=AdminSelectorVM();
  return (
    <>

<div className="backContainer">
       <p onClick={goBack}>ATRÁS</p> 
     </div>
     <div className="titleContainer">
        <h1 style={{ color: "#C0C0C0" }}>Funciones administrativas</h1>
      </div>
      <div className="bodyContainer2">
        <IonButton
          className="rolSelector"
        onClick={()=>{goCreateUser()}}
        >
          Registrar usuarios
        </IonButton>
        <IonButton
          className="rolSelector"
          onClick={()=>{goToUserList()}}
        >
          Lista de usuarios
        </IonButton>
        <IonButton
          className="rolSelector"
     onClick={()=>{goToRol()}}
        >
          Gestión de roles
        </IonButton>
    

      </div>
    </>
  )
}

export const AdminSelectorV=()=>{
  return(
    <NavBar key={2} component={<View></View>}></NavBar>
  )
}
