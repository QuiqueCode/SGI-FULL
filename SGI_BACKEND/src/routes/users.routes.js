import { Router } from "express";
import { getAsignUsers, login } from "../controllers/user.controller.js";
import { createIncident, getImages, getIncident, getIncidentData, getIncidentUser, getTechnicianIncident, sendFirstImages, technicianAsign } from "../controllers/incident.controller.js";
import { createDiagnosis, getDiagnosis } from "../controllers/diagnostico.controller.js";
import multer from "multer";
import { storage } from "./midleware.js";
import { getAffectation, getCategory, getRisk, getStatue } from "../controllers/statues.controller.js";



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
router.post("/asignTech",technicianAsign);

//Diagnosis
router.post('/cDiagnosis',createDiagnosis);
router.get('/gDiagnosisLi',getDiagnosis);

//Statues
router.get('/gStatue',getStatue);
router.get('/gRisk',getRisk);
router.get('/gAffectation',getAffectation);
router.get('/gCategory',getCategory);

//Obtener usuarios
router.get('/gAsignUsers',getAsignUsers);


export default router