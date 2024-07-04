import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from '@ionic/react'
import React, { useEffect } from 'react'
import { editUserVM } from '../../viewModels/EditUserVM/EditUserVM'
import { AsignRolVM } from '../../viewModels/AsignRolVM/AsignRolVM';

export default function EditUserV() {
const {state,changeState,roles, sendDataUser,getRoles,formData, handleInputChange,getDepartament,department, setRol,handleSubmit,goBack}= editUserVM();

useEffect(()=>{
  sendDataUser();
  getDepartament();
  getRoles();
},[])

return (
    <>
{state?(
    <IonContent className="container">
    <div className="bodyContainer5">
      <p onClick={goBack}>ATRÁS</p>
    </div>
    <div className="contentContainer">
      <h1 style={{ color: "#C0C0C0" }}>Registro de usuario</h1>
    </div>

    <form onSubmit={handleSubmit}>
      <div className="bodyContainer5">
        <h6>Nombre</h6>
        <IonInput
          class="custom"
          name="CT_NOMBRE"
          value={formData.CT_NOMBRE}
          onInput={handleInputChange}
          required
          style={{ marginBottom: "20px", marginTop: "10px" }}
        />
        <h6>Primer apellido</h6>
        <IonInput
          class="custom"
          name="CT_APELLIDO_UNO"
          value={formData.CT_APELLIDO_UNO}
          onInput={handleInputChange}
      
          required
          style={{ marginBottom: "20px", marginTop: "10px" }}
        />
        <h6>Segundo apellido</h6>
        <IonInput
          class="custom"
          name="CT_APELLIDO_DOS"
          value={formData.CT_APELLIDO_DOS}
          onInput={handleInputChange}
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
              value={formData.CN_DEPARTAMENTO}
              onIonChange={handleInputChange}
              onIonCancel={() => console.log("ionCancel fired")}
              onIonDismiss={() => console.log("ionDismiss fired")}
              style={{ color: "white", marginLeft: "10px" }}
              className="customSelec"
            >
            
            {department.map((data,index)=>(
 <IonSelectOption value={data.CN_CODIGO_DEPARTAMENTO}>{data.CT_NOMBRE_DEPARTAMENTO}</IonSelectOption>
                ))}
             
             
            </IonSelect>
          </div>
        </div>
        <h6>Correo</h6>
        <IonInput
          class="custom"
          name="CT_CORREO"
          value={formData.CT_CORREO}
          onInput={handleInputChange}
  
          required
          style={{ marginBottom: "20px", marginTop: "10px" }}
        />
        <h6>Puesto</h6>
        <IonInput
          class="custom"
          name="CT_PUESTO"
          value={formData.CT_PUESTO}
          onInput={handleInputChange}
  
          required
          style={{ marginBottom: "20px", marginTop: "10px" }}
        />
        <h6>Contraseña</h6>
        <IonInput
          class="custom"
          name="CT_CONTRASENA"
          value={formData.CT_CONTRASENA}
          onInput={handleInputChange}
      
          required
          style={{ marginBottom: "20px", marginTop: "10px" }}
        />
        <h6>Teléfono</h6>
        <IonInput
          class="custom"
          name="CN_TELEFONO"
          value={formData.CN_TELEFONO}
          onInput={handleInputChange}
    
          required
          style={{ marginBottom: "20px", marginTop: "10px" }}
        />
      </div>

      <div className="bodyContainer5">
        <IonButton className="sendButton" type="submit" >
          Guardar información
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


   {roles.map((rol,index)=>(
   <IonList inset={true} key={index}>
       <IonItem detail={false}>
         <IonLabel>
           {rol.CT_DESCRIPCION}

         </IonLabel>
         <IonButton style={{width:'150px'}} className= {formData.ROLES.includes(rol.CN_ID_ROL) ? 'desactivateUser2' : 'desactivateUser'} onClick={()=>{setRol(rol.CN_ID_ROL)}} > {formData.ROLES.includes(rol.CN_ID_ROL) ? 'Desasignar' : 'Asignar'}</IonButton>
       </IonItem>
     </IonList>

))}




     
 </IonContent>
)}
      
    </>
  )
}
