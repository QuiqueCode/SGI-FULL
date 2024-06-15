export interface IncidentTechnicianDetailM {
    CT_CODIGO_INCIDENCIA: string;
    CF_FECHA_HORA_REGISTRO: string;
    CT_CEDULA_USUARIO_CREADOR: string;
    CT_CEDULA_USUARIO_QUE_ASIGNA: string | null;
    CT_TITULO_INCIDENCIA: string;
    CT_DESCRIPCION_INCIDENCIA: string;
    CT_LUGAR_DE_INCIDENCIA: string;
    CN_ID_ESTADOF: number;
    CT_JUSTIFICACION_CIERRE: string;
    CD_COSTO: number;
    CN_DURACION_GESTION: number;
    CN_PRIORIDAD:number,
    CN_RIESGO:number,
    CN_CATEGORIA:number,
    CN_AFECTACION:number,
    CT_DESCRIPCION_PRIORIDAD: string;
    CT_DESCRIPCION_RIESGO: string;
    CT_DESCRIPCION_AFECTACION: string;
    CT_DESCRIPCION_CATEGORIA: string;

}

export interface IncidentDiagnosisListM{
    CN_ID_DIAGNOSTIC: number,
    CF_FECHA_HORA_DIAGNOSTICO: string,
    CT_DIAGNOSTICO: string,
    CN_TIEMPO_SOLUCION_ESTIMADO: number,
    CT_OBSERVACIONES: string,
    CB_REQUIERE_COMPRA: boolean,
    CT_TECNICO: string
}