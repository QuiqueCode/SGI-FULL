import { Router } from "express";
import { getAsignUsers, login } from "../controllers/user.controller.js";
import { createIncident, getImages, getIncident, getIncidentData, getIncidentUser, getSupervisorIncident, getTechnicianIncident, jusitfyClousure, sendFirstImages, sendLastImages, setCost, technicianAsign } from "../controllers/incident.controller.js";
import { createDiagnosis, getDiagnosis } from "../controllers/diagnostico.controller.js";
import multer from "multer";
import { storage } from "./midleware.js";
import { getAffectation, getCategory, getPriority, getRisk, getStatue, getSupervisorStatue, getTechStatue, updateAffectation, updateCategory, updatePriority, updateRisk, updateStatue } from "../controllers/statues.controller.js";
import { workReport } from "../controllers/report.controller.js";



const router =Router()
const upload = multer({ storage })

//Images
router.post('/imagesCIncident', upload.single('file'),sendFirstImages );
router.post('/lastImagesCIncident', upload.single('file'),sendLastImages );
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
router.post("/cJustify",jusitfyClousure);
router.get("/gSupervisorIncident",getSupervisorIncident);
//Change
router.patch("/uCost",setCost)

//Diagnosis
router.post('/cDiagnosis',createDiagnosis);
router.get('/gDiagnosisLi',getDiagnosis);

//Statues
router.get('/gStatue',getStatue);
router.get('/gTechStatue',getTechStatue);
router.get('/gSupervisorStatue',getSupervisorStatue);
router.get('/gRisk',getRisk);
router.get('/gAffectation',getAffectation);
router.get('/gCategory',getCategory);
router.get('/gPriority',getPriority);

//Obtener usuarios
router.get('/gAsignUsers',getAsignUsers);


//Actualizar estados
router.post('/uStatue',updateStatue);
router.post('/uRisk',updateRisk);
router.post('/uAffectation',updateAffectation);
router.post('/uCategory',updateCategory);
router.post('/uPriority',updatePriority);

//Reportes
router.get('/gWorkR',workReport);


export default router