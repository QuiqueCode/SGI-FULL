import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from '@ionic/react'
import React from 'react'
import { editUserVM } from '../../viewModels/EditUserVM/EditUserVM'

export default function EditUserV() {
const {state,changeState}= editUserVM();
  return (
    <>
{state?(
    <IonContent className="container">
    <div className="bodyContainer5">
      <p >ATRÁS</p>
    </div>
    <div className="contentContainer">
      <h1 style={{ color: "#C0C0C0" }}>Registro de usuario</h1>
    </div>

    <form >
      <div className="bodyContainer5">
        <h6>Nombre</h6>
        <IonInput
          class="custom"
          name="CT_NOMBRE"
      
          required
          style={{ marginBottom: "20px", marginTop: "10px" }}
        />
        <h6>Primer apellido</h6>
        <IonInput
          class="custom"
          name="CT_APELLIDO_UNO"
      
          required
          style={{ marginBottom: "20px", marginTop: "10px" }}
        />
        <h6>Segundo apellido</h6>
        <IonInput
          class="custom"
          name="CT_APELLIDO_DOS"
      
          required
          style={{ marginBottom: "20px", marginTop: "10px" }}
        />
        <h6>Cédula</h6>
        <IonInput
          class="custom"
          name="CT_CEDULA"
       
          required
          style={{ marginBottom: "20px", marginTop: "10px" }}
        />
        <div className="options">
          <IonButton
            style={{ width: "150px" }}
            className="asgignButton"
            onClick={() => {
            changeState()
            }}
          >
            Asignar Rol
          </IonButton>
          <div>
            <IonSelect
              aria-label="Statue"
              placeholder="Departamento"
              name="CN_DEPARTAMENTO"
     
              onIonCancel={() => console.log("ionCancel fired")}
              onIonDismiss={() => console.log("ionDismiss fired")}
              style={{ color: "white", marginLeft: "10px" }}
              className="customSelec"
            >
            
 <IonSelectOption >999</IonSelectOption>
             
             
            </IonSelect>
          </div>
        </div>
        <h6>Correo</h6>
        <IonInput
          class="custom"
          name="CT_CORREO"
  
          required
          style={{ marginBottom: "20px", marginTop: "10px" }}
        />
        <h6>Puesto</h6>
        <IonInput
          class="custom"
          name="CT_PUESTO"
  
          required
          style={{ marginBottom: "20px", marginTop: "10px" }}
        />
        <h6>Contraseña</h6>
        <IonInput
          class="custom"
          name="CT_CONTRASENA"
      
          required
          style={{ marginBottom: "20px", marginTop: "10px" }}
        />
        <h6>Teléfono</h6>
        <IonInput
          class="custom"
          name="CN_TELEFONO"
    
          required
          style={{ marginBottom: "20px", marginTop: "10px" }}
        />
      </div>

      <div className="bodyContainer5">
        <IonButton className="sendButton" type="submit" >
          Registrar Usuario
        </IonButton>
      </div>
    </form>
  </IonContent>
):(
    
    <IonContent 
    fullscreen>
   <div className="backContainer">
     <p onClick={changeState} >ATRÁS</p>
   </div>
   <div className="titleContainerTech">
     <h1 style={{ color: "#C0C0C0" }}>Lista de Roles</h1>
   </div>


   <IonList inset={true} >
       <IonItem detail={false}>
         <IonLabel>
     

         </IonLabel>
         <IonButton className="asign"  >Asignar</IonButton>
       </IonItem>
     </IonList>



     
 </IonContent>
)}
      
    </>
  )
}
