import { IonButton, IonIcon } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import React from 'react'
import { ReportSelector } from '../../viewModels/ReportSelectorVM/ReportSelectorVM'

export default function ReportSelectorV() {

    const {goBack,goToWorkReport,  goToBinnacleReport,goToWorkReport2}=ReportSelector()
  return (
  
    <>
   
    <div className="backContainer">
        <p onClick={()=>{goBack()}}>ATRÁS</p>
     </div>
   <div className="bodyContainer2">
    
     <IonButton className="rolSelector" onClick={()=>{goToWorkReport2()}} >Reporte de trabajos</IonButton> 
     <IonButton className="rolSelector" onClick={()=>{goToWorkReport()}} >Reporte cargas de trabajo</IonButton> 
     <IonButton className="rolSelector" onClick={()=>{goToBinnacleReport()}}>Reporte de bitácoras</IonButton> 

    
   </div>

   </>
  )
}
