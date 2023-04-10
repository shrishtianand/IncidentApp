// Import the express in typescript file
import express, { Router } from 'express';
import { IncidentController } from '../controllers/IncidentController';
import { validateCreateIncident, validateGetIncidentByID } from '../middleware/validations';

const incidentRouter:Router = express.Router();
const incObject:IncidentController = new IncidentController();

//purpose:To create a incident
incidentRouter.post("/create",validateCreateIncident,incObject.createIncident); 

//purpose:To get a incident
incidentRouter.get("/get",incObject.getIncident);

//purpose:To get a incident
incidentRouter.get("/getfiltered",incObject.getFilteredIncident);

//purpose:To get a incident by incidentID
incidentRouter.get("/getByID",validateGetIncidentByID,incObject.getIncidentByID); 

//purpose: To update existing incident
incidentRouter.post("/update",incObject.updateIncident); 

//purpose:To delete a incident by incidentID
incidentRouter.delete("/delete",incObject.deleteIncidentByID); 

export default incidentRouter;