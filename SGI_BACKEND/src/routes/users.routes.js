import { Router } from "express";
import { login } from "../controllers/user.controller.js";
import { createIncident, getIncident, getIncidentData, getTechnicianIncident } from "../controllers/incident.controller.js";
import { createDiagnosis, getDiagnosis } from "../controllers/diagnostico.controller.js";



const router =Router()

//User
router.post('/login',login);

//Incident
router.post('/cIncident',createIncident);
router.get('/gIncident',getIncident);
router.get("/gTechIncidents",getTechnicianIncident);
router.get("/gIncidentInfo",getIncidentData);

//Diagnosis
router.post('/cDiagnosis',createDiagnosis);
router.get('/gDiagnosisLi',getDiagnosis);


export default router