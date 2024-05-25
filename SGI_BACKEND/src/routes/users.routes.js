import { Router } from "express";
import { login } from "../controllers/user.controller.js";
import { createIncident } from "../controllers/incident.controller.js";
import { createDiagnosis } from "../controllers/diagnostico.controller.js";



const router =Router()

//User
router.post('/login',login);

//Incident
router.post('/cIncident',createIncident)

//Diagnosis
router.post('/cDiagnosis',createDiagnosis)

export default router