import { IonButton, IonContent, IonItem, IonLabel, IonList, IonSpinner } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { rolAdministrationVM } from '../../viewModels/RolAministrationVM/RolAdministrationVM'
import './rolAdministration.css'
export default function RolAministrationV() {
    const {getRoles,roles,goToAdminView,suspendRole}=rolAdministrationVM();
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
      const loadData=async()=>{
        await Promise.all([
          getRoles()
        ]);
        setLoading(false);
      }
      loadData();
    },[])
  return (
    <>
    {loading?(
        <IonSpinner name="crescent" color='light' className="loading-spinner2" />
    ):(
        <IonContent 
        fullscreen>
       <div className="backContainer">
         <p onClick={goToAdminView}>ATRÁS</p>
       </div>
       <div className="titleContainerTech">
         <h1 style={{ color: "#C0C0C0" }}>Lista de Roles</h1>
       </div>
    
    {roles.map((rol,index)=>(
       <IonList inset={true} >
       <IonItem detail={false}>
         <IonLabel>
        {rol.CT_DESCRIPCION}
    
         </IonLabel>
         <IonButton
         key={index}
      className={rol.CB_ESTADO?"desactivateAsign":"desactivateAsign2"}
    onClick={()=>{suspendRole({CN_ID_ROL:rol.CN_ID_ROL,CB_ESTADO:!rol.CB_ESTADO})}}
    >
      {rol.CB_ESTADO? 'Suspender' : 'Activar'}
    </IonButton>
       </IonItem>
     </IonList>
    ))}
    
    
    
         
     </IonContent>
    )}
    </>
  );
}
