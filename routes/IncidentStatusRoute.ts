// Import the express in typescript file
import express, { Router } from 'express';
import { IncidentStatusController } from '../controllers/IncidentStatusController';
import { validateCreateIncident, validateGetIncidentByID } from '../middleware/validations';

const incidentStatusRouter:Router = express.Router();
const incStatusObject:IncidentStatusController = new IncidentStatusController();

//purpose:To create a incidentstatus
incidentStatusRouter.post("/create",validateCreateIncident,incStatusObject.createIncident); 

//purpose:To get a incidentstatus
incidentStatusRouter.get("/get",incStatusObject.getIncident);

//purpose:To get a incidentstatus
incidentStatusRouter.get("/getfiltered",incStatusObject.getFilteredIncident);

//purpose:To get a incident by incidentID
incidentStatusRouter.get("/getByID",validateGetIncidentByID,incStatusObject.getIncidentByID); 

//purpose:To delete a incident by incidentID
//incidentStatusRouter.delete("/delete",validateGetIncidentByID,incObject.deleteIncidentByID); 

export default incidentStatusRouter;