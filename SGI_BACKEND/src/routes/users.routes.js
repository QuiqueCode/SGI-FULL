import { Router } from "express";
import { login } from "../controllers/user.controller.js";
import { createIncident, getImages, getIncident, getIncidentData, getIncidentUser, getTechnicianIncident, sendFirstImages } from "../controllers/incident.controller.js";
import { createDiagnosis, getDiagnosis } from "../controllers/diagnostico.controller.js";
import multer from "multer";
import { storage } from "./midleware.js";



const router =Router()
const upload = multer({ storage })

//Images
router.post('/imagesCIncident', upload.single('file'),sendFirstImages );
router.get('/imagesDetailIncident',getImages );

//User
router.post('/login',login);
router.get('/gIncidentU',getIncidentUser);

//Incident
router.post('/cIncident',createIncident);
router.get('/gIncident',getIncident);
router.get("/gTechIncidents",getTechnicianIncident);
router.get("/gIncidentInfo",getIncidentData);

//Diagnosis
router.post('/cDiagnosis',createDiagnosis);
router.get('/gDiagnosisLi',getDiagnosis);


export default router