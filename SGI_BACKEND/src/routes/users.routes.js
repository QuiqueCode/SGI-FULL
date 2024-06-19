import { Router } from "express";
import { createUser, getAllUsers, getAsignUsers, login, suspendUser } from "../controllers/user.controller.js";
import { createIncident, getImages, getIncident, getIncidentData, getIncidentUser, getSupervisorIncident, getTechnicianIncident, jusitfyClousure, sendFirstImages, sendLastImages, setCost, technicianAsign } from "../controllers/incident.controller.js";
import { createDiagnosis, getDiagnosis } from "../controllers/diagnostico.controller.js";
import multer from "multer";
import { storage } from "./midleware.js";
import { getAffectation, getCategory, getPriority, getRisk, getStatue, getSupervisorStatue, getTechStatue, updateAffectation, updateCategory, updatePriority, updateRisk, updateStatue } from "../controllers/statues.controller.js";
import { binnacleReport, workReport, workReport2 } from "../controllers/report.controller.js";
import { getDepartamentos, getRoles, suspendRol } from "../controllers/roles.controlle.js";



const router =Router()
const upload = multer({ storage })

//Images
router.post('/imagesCIncident', upload.single('file'),sendFirstImages );
router.post('/lastImagesCIncident', upload.single('file'),sendLastImages );
router.get('/imagesDetailIncident',getImages );

//User
router.post('/login',login);
router.get('/gIncidentU',getIncidentUser);
router.post('/cUser',createUser);

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
router.get('/getAllUsr',getAllUsers)
router.post('/suspendUsr',suspendUser)


//Actualizar estados
router.post('/uStatue',updateStatue);
router.post('/uRisk',updateRisk);
router.post('/uAffectation',updateAffectation);
router.post('/uCategory',updateCategory);
router.post('/uPriority',updatePriority);

//Reportes
router.get('/gWorkR',workReport);
router.get('/gBinnacleR',binnacleReport);
router.get('/gworkR2',workReport2);

//Roles
router.get('/gRoles',getRoles);
router.post('/suspendRole',suspendRol);

//departamentos
router.get('/gDepartamentos',getDepartamentos);


export default router