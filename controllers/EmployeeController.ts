import { Request, Response} from 'express';
import { Employee } from '../models/EmployeeModel';
import { statusCodes,csvColumns } from '../utility/constants';
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
            let returnObj = await Util.returnObj([error],statusCodes.error,'Employee','createerr')
            return res.json(returnObj)        
        }
    }

    async  getByIDEmployee(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const employee = await Util.getbyIDData(Employee,req.body);
            if(employee.status > 299){
                return res.json(employee)
            }
            else{
                const result = await Util.saveData(Employee,employee.data)
                return res.json(result)
            }
                    
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Employee','createerr')
            return res.json(returnObj)        
        }
    }

    async getAllEmployee(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const employee = await Util.getAllData(Employee,req.body);
            if(employee.status > 299){
                let returnObj = await Util.returnObj([employee.data],statusCodes.error,'Employee','getallerr')
                return res.json(returnObj)
            }
            else{
                let returnObj = await Util.returnObj(employee.data,statusCodes.error,'Employee','getall')
                return res.json(returnObj)            
            }                
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Employee','getallerr')
            return res.json(returnObj)        
        }
    }


    async saveEmployeesFromFile(req: Request,res: Response) {
        try {
            let errors = [];
            let employees = await Util.getAllData(Employee,{});
            fs.createReadStream('./utility/data.csv')
            .pipe(csv(csvColumns))
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
                        ...employeeData.data[0],
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
                    let returnObj = await Util.returnObj(errors,statusCodes.error,'Employee','createerr')
                    return res.json(returnObj)
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
                        let returnObj = await Util.returnObj(errors,statusCodes.error,'Employee','createerr')
                        return res.json(returnObj)
                    }
                    else{
                        let returnObj = await Util.returnObj(null,statusCodes.success,'Employee','create')
                        return res.json(returnObj)
                    } 
                    }
                });            
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Employee','createerr')
            return res.json(returnObj)            
        }    
    }
}     

