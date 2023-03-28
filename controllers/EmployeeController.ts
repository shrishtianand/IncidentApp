import { Request, Response} from 'express';
import { Employee } from '../models/EmployeeModel';
import { createData,getAllData,getbyIDData,saveData,deleteData } from '../utility/utils';
import { statusCodes,empMessages } from '../utility/constants';
import csv from 'csv-parser';
import fs from 'fs';

async function createEmployee(req: Request,res: Response){
    try {
        // const user = await appDataSource.getRepository(Employee).create(req.body)
        const employee = await createData(Employee,req.body);
        if(employee == "error"){
            return res.json({
                status:statusCodes.error,
                message:empMessages.empCreateError,
                data:null
            })
        }
        else{
            const result = await saveData(Employee,employee)
            if(result == "error"){
                return res.json({
                    status:statusCodes.error,
                    message:empMessages.empSaveError,
                    data:null
                })
            }
            else{
                return res.json({
                    status:statusCodes.success,
                    message:empMessages.empCreatedSuccessfully,
                    data:result
                })
            }
        }
                
    } catch (error) {
        return res.json({
            status:statusCodes.error,
            message:empMessages.empCreateError,
            data:error
        })        
    }
}

async function deleteEmployee(req: Request,res: Response){
    try {
        // const user = await appDataSource.getRepository(Employee).create(req.body)
        const employee = await deleteData(Employee,req.body);
        if(employee == "error"){
            return res.json({
                status:statusCodes.error,
                message:empMessages.empDeleteError,
                data:null
            })
        }
        else{
            
            return res.json({
                status:statusCodes.success,
                message:empMessages.empDeletedSuccessfully,
                data:"success"
            })            
        }                
    } catch (error) {
        return res.json({
            status:statusCodes.error,
            message:empMessages.empCreateError,
            data:error
        })        
    }
}

async function getAllEmployee(req: Request,res: Response){
    try {
        // const user = await appDataSource.getRepository(Employee).create(req.body)
        const employee = await getAllData(Employee,req.body);
        if(employee == "error"){
            return res.json({
                status:statusCodes.error,
                message:empMessages.empDeleteError,
                data:null
            })
        }
        else{            
            return res.json({
                status:statusCodes.success,
                message:empMessages.empDeletedSuccessfully,
                data:employee
            })            
        }                
    } catch (error) {
        return res.json({
            status:statusCodes.error,
            message:empMessages.empCreateError,
            data:error
        })        
    }
}


async function saveEmployeesFromFile(req: Request,res: Response) {
        const errors = [];
        fs.createReadStream('./utility/data.csv')
          .pipe(csv(['firstName', 'lastName','emailId','department','client','project']))
          .on('data', async (data) => { 
            const employee = await createData(Employee,data);
            if(employee == "error"){
                errors.push(data.emailId)
            }
            else{
                const result = await saveData(Employee,data)
                if(result == "error"){
                    errors.push(data.emailId)
                }
            }})
        .on('end', () => {
            if(errors.length >0){
                return res.json({
                        status:statusCodes.error,
                        message:empMessages.empCreateError,
                        data:errors
                        })
            }
            else{
                return res.json({
                            status:statusCodes.success,    
                            message:empMessages.empCreatedSuccessfully,    
                            data:null    
                        }) 
                }
            });    
}
    

export{
    createEmployee,
    getAllEmployee,
    deleteEmployee,
    saveEmployeesFromFile
}