// Import the express in typescript file
import express from 'express';
import multer from 'multer';
import path from 'path';
import { EmployeeController} from '../controllers/EmployeeController';
import { validateCreateEmployee, validateDeleteEmployee } from '../middleware/validations';
var empRouter  = express.Router();
const empObject:EmployeeController = new EmployeeController();

/**
 *Multer package is used to upload the file data into the server.
 Also, the server details, file parameters can be customized. 
 */
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'attachments/')
    },
    filename: function (req, file, cb) {
  cb(null,`document${path.extname(file.originalname)}`)
  
    }
})
  
const upload = multer({ storage: storage })
empRouter.post("/create",validateCreateEmployee,empObject.createEmployee); //purpose:To create a employee
empRouter.get("/get",empObject.getAllEmployee);
empRouter.get("/getByID",empObject.getByIDEmployee);
empRouter.post("/saveEmployeesFromFile",upload.single('document'),empObject.saveEmployeesFromFile); //purpose:To create a employee from input file
export default empRouter;