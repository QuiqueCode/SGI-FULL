interface WorkReportModel {
    idCategoria: number;
    tecnicos: [];  // Array de objetos TechnicianModel
    incidencias: {
      total_incidencias: number;
      trabajo_pendiente: string | null;  // Puede ser string o null según el modelo
      trabajo_terminado: string;
    };
  }

