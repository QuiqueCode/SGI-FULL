import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonIcon, IonItem, IonItemOption, IonLabel, IonList, IonNote, IonSelect, IonSelectOption } from "@ionic/react";
import { build, calendar, cog, navigate, play, shield } from "ionicons/icons";
import "./DetailIncidentSupervisorStyle.css"
import { DetailIncidentSupervisorVM } from "../../viewModels/DetailIncidentSupervisorVM/DetailIncidentSupervisorVM";
import { useEffect } from "react";

export function DetailIncidentManagerV(){
  const { setDetails,
    getStatues,
    getAffectation,
    getRisk,
    getCategory,
    formatDateTime,
    statue,
    risk,
    category,
    affectation,
    detail,
    chargeImages,
    imagesData,
    loading, 
    setLoading,
    error, 
    setError,
    sendDiagnosis,
    diagnosisData,
  backToSupervisorList,
  goToAsign,
  handleStatue,
  handleRisk,
  handleAffectation,
  handleCategory,
  goToJustify,
  imagesData2

}= DetailIncidentSupervisorVM();

    useEffect(() => {
      setDetails();
      sendDiagnosis();
      chargeImages();
      getStatues();
      getRisk();
      getCategory();
      getAffectation();
      
      
    }, []);
    return(
        <>
        <IonContent fullscreen>
          <div className="backContainer">
            <p onClick={()=>{backToSupervisorList()}}>ATRÁS</p>
          </div>
          <div className="titleContainer">
            <h1 style={{ color: "#C0C0C0" }}>
              {"Incidencia: "+ detail?.CT_CODIGO_INCIDENCIA }
            </h1>
          </div>
  
          <div className="bodyContainer7">
            <div className="icon-text">
              <IonIcon icon={build} className="icon" />
              <span>
                {"Titulo de la incidencia: "+ detail?.CT_TITULO_INCIDENCIA}
              </span>
            </div>
            <div className="icon-text">
              <IonIcon icon={calendar} className="icon" />
              <span>
                {"Fecha y hora de registro: "  +
                formatDateTime(detail?.CF_FECHA_HORA_REGISTRO || "")}
              </span>
            </div>
            {/**
               <div className="icon-text">
              <IonIcon icon={person} className="icon" />
              <span>Solicitante: </span>
            </div> 
             
             */}
          
            <div className="icon-text">
              <IonIcon icon={play} className="icon" />
              <span style={{ marginRight: "15px" }}>Estado:</span>
  
              <div>
              <IonSelect
    aria-label="Statue"
    placeholder="Seleccionar estado"
    onIonChange={(e) =>
      handleStatue({CN_ID_ESTADOF:e.detail.value,CT_CODIGO_INCIDENCIA:localStorage.getItem('idIncident')||''})
    }
    value={detail?.CN_ID_ESTADOF}
    onIonCancel={() => console.log("ionCancel fired")}
    onIonDismiss={() => console.log("ionDismiss fired")}
    className="customSelec"
  >
  {statue.map((data,index)=>(

<IonSelectOption key={index} value={data.CN_ID_ESTADO}>{data.CT_DESCRIPCION}</IonSelectOption>

  ))}

  </IonSelect>
  
              </div>
            </div>
            <div className="icon-text">
              <IonIcon icon={shield} className="icon" />
              <span style={{ marginRight: "15px" }}>{"Riesgo:"}</span>
              <div>
              <IonSelect
    aria-label="Statue"
    placeholder="Seleccionar riesgo"
    value={detail?.CN_RIESGO}
    onIonChange={(e) =>
      handleRisk({CN_RIESGO:e.detail.value,CT_CODIGO_INCIDENCIA:localStorage.getItem('idIncident')||''})
    }
    
    onIonCancel={() => console.log("ionCancel fired")}
    onIonDismiss={() => console.log("ionDismiss fired")}
    className="customSelec"
  >
   {risk.map((data,index)=>(

<IonSelectOption key={index} value={data.CN_ID_RIESGO}>{data.CT_DESCRIPCION}</IonSelectOption>

  ))}
  </IonSelect>
  
              </div>
            </div>
            <div className="icon-text">
              <IonIcon icon={shield} className="icon" />
              <span style={{ marginRight: "15px" }}>{"Afectación: "} </span>
              <div>
              <IonSelect
    aria-label="Statue"
    placeholder="Seleccionar afectación"
    value={detail?.CN_AFECTACION}
    onIonChange={(e) =>
        handleAffectation({CN_AFECTACION:e.detail.value,CT_CODIGO_INCIDENCIA:localStorage.getItem('idIncident')||''})
    }
    onIonCancel={() => console.log("ionCancel fired")}
    onIonDismiss={() => console.log("ionDismiss fired")}
    className="customSelec"
  >
   {affectation.map((data,index)=>(

<IonSelectOption key={index} value={data.CN_ID_AFECTACION}>{data.CT_DESCRIPCION}</IonSelectOption>

  ))}
  </IonSelect>
  
              </div>
            </div>
            <div className="icon-text">
              <IonIcon icon={navigate} className="icon" />
              <span style={{ marginRight: "15px" }}>
                {"Lugar de afectación: "+ detail?.CT_LUGAR_DE_INCIDENCIA}
              </span>
            
            </div>
            <div className="icon-text">
              <IonIcon icon={cog} className="icon" />
              <span style={{ marginRight: "15px" }}>{"Categoría: " } </span>
              <div>
              <IonSelect
    aria-label="Statue"
    placeholder="Seleccionar categoría"
    onIonChange={(e) =>
      handleCategory({CN_CATEGORIA:e.detail.value,CT_CODIGO_INCIDENCIA:localStorage.getItem('idIncident')||''})
    }
    onIonCancel={() => console.log("ionCancel fired")}
    onIonDismiss={() => console.log("ionDismiss fired")}
    value={detail?.CN_CATEGORIA}
    className="customSelec"
  >
    {category.map((data,index)=>(

<IonSelectOption key={index} value={data.CN_ID_CATEGORIA}>{data.CT_DESCRIPCION}</IonSelectOption>

  ))}
  </IonSelect>
  
              </div>
            </div>
            <div className="icon-text">
              <IonButton className="asgignButton" onClick={()=>{goToAsign()}}>Asignar técnicos</IonButton>
            </div>
          </div>
  
          <div className="cardContainer">
          <IonList style={{width:"100%",marginBottom:"10px",borderRadius:"8px"}}>
             <IonItem detail={false}>
               <IonLabel>
                  {"Descripción: "} <br />
          
               <IonNote color="secondary" className="ion-text-wrap">
               {detail?.CT_DESCRIPCION_INCIDENCIA}
                 </IonNote>
                 </IonLabel>
     
             </IonItem>
         
           </IonList>
       
  
      
       
          </div>
  
          <div className="cardContainer">
            <IonCard className="cardInfo">
              <IonCardHeader>
                <IonCardTitle class="cardtitle">Imagenes iniciales</IonCardTitle>
              </IonCardHeader>
              {imagesData.map((image, index) => (
                <img
                  key={image.CT_ID_IMAGEN}
                  src={`http://localhost:3000${image.CT_IMAGEN}`}
                  alt={`Imagen ${image.CT_ID_IMAGEN}`}
                />
              ))}
            </IonCard>
          </div>
          <div className="cardContainer">
            <IonCard className="cardInfo">
              <IonCardHeader>
                <IonCardTitle class="cardtitle">Imagenes finales</IonCardTitle>
              </IonCardHeader>
              {imagesData2.map((image, index) => (
                <img
                  key={image.CT_ID_IMAGEN}
                  src={`http://localhost:3000${image.CT_IMAGEN}`}
                  alt={`Imagen ${image.CT_ID_IMAGEN}`}
                />
              ))}
            </IonCard>
          </div>
          <div className="cardContainer">
         
         
          {diagnosisData.map((data, index) => (
           
             <IonList style={{width:"100%",marginBottom:"10px",borderRadius:"8px"}}>
             <IonItem detail={false}>
               <IonLabel>
               <IonNote color="secondary" className="ion-text-wrap">
              {"Diagnostico #"+(index+1)}
              </IonNote><br />
               <IonNote color="dark" className="ion-text-wrap">
               {"Fecha: " + formatDateTime(data.CF_FECHA_HORA_DIAGNOSTICO)}
                 </IonNote><br />
                 <IonNote color="dark" className="ion-text-wrap">
                 {"Tiempo estimado: " + data.CN_TIEMPO_SOLUCION_ESTIMADO + "h"}  
                 </IonNote><br />
                 <IonNote color="dark" className="ion-text-wrap">
                 {"Requiere compra: " + (data.CT_DIAGNOSTICO ? "Sí" : "No")} <br />
                 </IonNote>
                 {"Diagnostico: " + data.CT_DIAGNOSTICO}<br />
                 {"Observaciones: " + data.CT_OBSERVACIONES}
               </IonLabel>
     
             </IonItem>
         
           </IonList>
           
          ))}
          <IonCard style={{width:"100%"}}>
      <IonCardHeader>
        <IonCardTitle>Justificación de cierre</IonCardTitle>
       
      </IonCardHeader>

      <IonCardContent>{detail?.CT_JUSTIFICACION_CIERRE}</IonCardContent>
    </IonCard>
           </div>
          
            <IonButton className="button2" onClick={()=>{goToJustify()}}>Justificación de cierre</IonButton>
        
        </IonContent>
      </>
    )
}