import { Request, Response} from 'express';
import { Employee } from '../models/EmployeeModel';
import { statusCodes,csvColumns } from '../utility/constants';
import { Util } from '../utility/utils';
import csv from 'csv-parser';
import fs from 'fs';
import { appDataSource } from '../database/database';

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
                let returnObj = await Util.returnObj(employee.data,statusCodes.success,'Employee','getall')
                return res.json(returnObj) 
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
                let returnObj = await Util.returnObj(employee.data,statusCodes.success,'Employee','getall')
                return res.json(returnObj)            
            }                
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Employee','getallerr')
            return res.json(returnObj)        
        }
    }

    async saveEmployeesFromFile(req: Request,res: Response) {
        try {
            let csvData = [];
            fs.createReadStream('./utility/data.csv')
            .pipe(csv(csvColumns))
            .on('data', async (data) => {
                csvData.push(data);
            })
            .on('end', async () => {
                var csvresponse = await Util.getCSVEmails(csvData);
                if(csvresponse.errors.length >0){
                    let returnObj = await Util.returnObj(csvresponse.errors,statusCodes.error,'Employee','createerr')
                    return res.json(returnObj)
                }
                else{
                    // await appDataSource
                    // .createQueryBuilder()
                    // .update(Employee)
                    // .set({ "foundInFile":false })
                    // .where("'employee.emailID' NOT IN (:emails)", { emails: csvresponse.csvEmails })
                    // .execute();
                    await appDataSource.manager.query(`UPDATE employee SET "foundInFile" = $1 WHERE employee."emailID" NOT IN ($2)`, [
                        false,
                        csvresponse.csvEmails
                    ]);
                    let returnObj = await Util.returnObj(csvresponse.csvEmails,statusCodes.success,'Employee','create')
                    return res.json(returnObj)
                    }
                });            
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Employee','createerr')
            return res.json(returnObj)            
        }    
    }   
}     

