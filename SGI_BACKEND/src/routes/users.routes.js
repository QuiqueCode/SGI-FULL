import { Router } from "express";
import { login } from "../controllers/user.controller.js";
import { createIncident, getIncident, getTechnicianIncident } from "../controllers/incident.controller.js";
import { createDiagnosis } from "../controllers/diagnostico.controller.js";



const router =Router()

//User
router.post('/login',login);

//Incident
router.post('/cIncident',createIncident);
router.get('/gIncident',getIncident);
router.get("/gTechIncidents",getTechnicianIncident);

//Diagnosis
router.post('/cDiagnosis',createDiagnosis);

export default router