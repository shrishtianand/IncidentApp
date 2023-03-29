// Import the express in typescript file
import express from 'express';
import { EmployeeController} from '../controllers/EmployeeController';
import { validateCreateEmployee, validateDeleteEmployee } from '../middleware/validations';
var empRouter  = express.Router();
const empObject:EmployeeController = new EmployeeController();

empRouter.post("/create",validateCreateEmployee,empObject.createEmployee); //purpose:To create a employee

empRouter.delete("/delete",validateDeleteEmployee,empObject.deleteEmployee);
empRouter.get("/get",empObject.getAllEmployee);
empRouter.get("/saveEmployeesFromFile",empObject.saveEmployeesFromFile); //purpose:To create a employee from input file
export default empRouter;