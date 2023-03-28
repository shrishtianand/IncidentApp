// Import the express in typescript file
import express from 'express';
import { createIncident,getIncident,getIncidentByID, getFilteredIncident, getAllIncident, deleteIncidentByID } from '../controllers/IncidentController';
import { validateCreateIncident, validateGetIncidentByID } from '../middleware/validations';

var incidentRouter = express.Router();
//purpose:To create a incident
incidentRouter.post("/create",validateCreateIncident,createIncident); 

//purpose:To get a incident
incidentRouter.get("/get",getIncident);

//purpose:To get a incidentvalidateCreateIncident
incidentRouter.get("/getAll",getAllIncident);

//purpose:To get a incident
incidentRouter.get("/getfiltered",getFilteredIncident);

//purpose:To get a incident by incidentID
incidentRouter.get("/getByID",validateGetIncidentByID,getIncidentByID); 

//purpose:To delete a incident by incidentID
incidentRouter.delete("/delete",validateGetIncidentByID,deleteIncidentByID); 

export default incidentRouter;