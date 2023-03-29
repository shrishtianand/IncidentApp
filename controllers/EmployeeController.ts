import { Request, Response} from 'express';
import { Employee } from '../models/EmployeeModel';
import { statusCodes,empMessages,returnObject } from '../utility/constants';
import { Util } from '../utility/utils';
import csv from 'csv-parser';
import fs from 'fs';

export class EmployeeController{
    async  createEmployee(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const employee = await Util.createData(Employee,req.body);
            if(employee.status > 299){
                return res.json(employee)
            }
            else{
                const result = await Util.saveData(Employee,employee.data)
                return res.json(result)
            }
                    
        } catch (error) {
            return res.json({
                status:statusCodes.error,
                message:empMessages.empCreateError,
                data:error
            })        
        }
    }

    async deleteEmployee(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const employee = await Util.deleteData(Employee,req.body);
            if(employee == null){
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

    async getAllEmployee(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const employee = await Util.getAllData(Employee,req.body);
            if(employee == null){
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


    async saveEmployeesFromFile(req: Request,res: Response) {
        try {
            let errors = [];
            let employees = await Util.getAllData(Employee,{});
            fs.createReadStream('./utility/data.csv')
            .pipe(csv(['firstName', 'lastName','emailID','department','client','project']))
            .on('data', async (data) => {
                var index = employees.data.findIndex(x => x.emailID ===data.emailID);
                employees.data.splice(index, 1)
                const employeeData = await Util.getbyIDData(Employee,{emailID:data.emailID});
                if(employeeData.status > 299){
                    errors.push(data.emailID)
                }
                else if(employeeData.status == 200 && employeeData.data[0] == null){
                    const employee = await Util.createData(Employee,data);
                    if(employee.status > 299){
                        errors.push(data.emailID)
                    }
                    else{
                        const result = await Util.saveData(Employee,employee.data[0])
                        if(result.status > 299){
                            errors.push(data.emailID)
                        }
                    }
                }
                else if(employeeData.status == 200 && employeeData.data[0] != null){
                    let updateData = {
                        ...employeeData,
                        firstName:data.firstName,
                        lastName:data.lastName,
                        department:data.department,
                        client:data.client,
                        project:data.project,
                        foundInFile:true
                    }
                    const result = await Util.saveData(Employee,updateData)
                    if(result.status > 299){
                        errors.push(data.emailID)
                    }
                }
                else{
                    errors.push(data.emailID)
                }
            })
            .on('end', async () => {
                if(errors.length >0){
                    const returnObject: returnObject = {
                        data: errors,
                        status: statusCodes.error,
                        message: empMessages.empCreateError,
                    };
                    return res.json(returnObject)
                }
                else{
                    await employees.data.forEach(async (detail)=> {
                        let updateData = {
                            ...detail,
                            foundInFile:false
                        }
                    const result = await Util.saveData(Employee,updateData)
                        if(result.status > 299){
                            errors.push(detail.emailID)
                        }
                    });
                    if(errors.length >0){
                        const returnObject: returnObject = {
                            data: errors,
                            status: statusCodes.error,
                            message: empMessages.empCreateError,
                        };
                        return res.json(returnObject)
                    }
                    else{
                        const returnObject: returnObject = {
                            data: null,
                            status: statusCodes.success,
                            message: empMessages.empCreatedSuccessfully,
                        };
                        return res.json(returnObject)
                    } 
                    }
                });            
        } catch (error) {
            const returnObject: returnObject = {
                data: error,
                status: statusCodes.error,
                message: empMessages.empCreateError,
            };
            return res.json(returnObject)            
        }    
    }
}     

