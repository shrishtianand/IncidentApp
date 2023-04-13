import { appDataSource } from "../database/database"
import { logger, fileName } from "../log4";
import { Employee } from "../models/EmployeeModel";
import { returnObject, statusCodes, defaultMessages } from "./constants";

class Utils{
    fName: string;
    constructor(){
        fileName(__filename).then((data)=>{
            this.fName = data;
        });
    }
    
    async createData(model: any,data: any){
        let modelName = model.name;
        try {
            const createData = await appDataSource.getRepository(model).create(data)
            let returnObject = this.returnObj([createData],statusCodes.success,modelName,'create');
            logger.info(`${this.fName} : Successfully created record for : ${modelName}`);
            return returnObject;
        } catch (error) {
            logger.info(`${this.fName} : Error creating record for : ${modelName}`);
            let returnObject = this.returnObj([error],statusCodes.error,modelName,'createerr');
            logger.info(error)
            return returnObject;
        }
    }

    async updateData(model: any,data: any){
        let modelName = model.name;
        try {
            const getModelID = await appDataSource.getRepository(model).getId(data)
            const updateData = await appDataSource.createQueryBuilder().update(model).set(data).where("IncidentId = :IncidentId",{IncidentId: getModelID}).execute()
            let returnObject = this.returnObj([updateData],statusCodes.success,modelName,'create');
            logger.info(`${this.fName} : Successfully updated record for : ${modelName}`);
            return returnObject;
        } catch (error) {
            logger.info(`${this.fName} : Error updating record for : ${modelName}`);
            logger.info(error)
            let returnObject = this.returnObj([error],statusCodes.error,modelName,'createerr');
            return returnObject;
        }
    }

    async getAllData(model: any,data: any){
        let modelName = model.name;
        try {
            const createData = await appDataSource.getRepository(model).find(data)
            let returnObject = this.returnObj(createData,statusCodes.success,modelName,'getall');
            logger.info(`${this.fName} : Successful Retrival record(s) for : ${modelName}`);
            return returnObject;
        } catch (error) {
            logger.info(`${this.fName} : Error retriving record(s)for : ${modelName}`);
            logger.info(error)
            let returnObject = this.returnObj([error],statusCodes.error,modelName,'getallerr');
            return returnObject;
        }
    }

    async getbyIDData(model: any,data: any){
        let modelName = model.name;
        try {
            const createData = await appDataSource.getRepository(model).findOneBy(data)
            let returnObject = this.returnObj([createData],statusCodes.success,modelName,'getsingle');
            logger.info(`${this.fName} : Successful retrival record for : ${modelName}`);
            return returnObject;
        } catch (error) {
            logger.info(`${this.fName} : Error retriving record for : ${modelName}`);
            logger.info(error)
            let returnObject = this.returnObj([error],statusCodes.error,modelName,'getsingleerr');
            return returnObject;
        }
    }

    async saveData(model: any,data: any){
        let modelName = model.name;
        try {
            const saveData = await appDataSource.getRepository(model).save(data)
            let returnObject = this.returnObj(saveData,statusCodes.success,modelName,'save');
            logger.info(`${this.fName} : Successfully saved record for : ${modelName}`);
            return returnObject;
        } catch (error) {
            logger.info(`${this.fName} : Error saving record for : ${modelName}`);
            logger.info(error)
            let returnObject = this.returnObj([error],statusCodes.error,modelName,'saveerr');
            return returnObject;
        }
    }

    async deleteData(model: any,data: any){
        let modelName = model.name;
        try {
            const deleteData = await appDataSource.getRepository(model).delete(data)
            let returnObject = this.returnObj([deleteData],statusCodes.success,modelName,'save');
            logger.info(`${this.fName} : Successfully deleted record for : ${modelName}`);
            return returnObject;
        } catch (error) {
            logger.info(`${this.fName} : Error deleting record for : ${modelName}`);
            logger.info(error)
            let returnObject = this.returnObj([error],statusCodes.error,modelName,'saveerr');
            return returnObject;
        }
    }
    async getCSVEmails(csvData: Array<any>) {
        try {
            var returnData = {errors:[],csvEmails:[]}
            for await (const data of csvData) {
                returnData.csvEmails.push(data.emailID)
                const employeeData = await Util.getbyIDData(Employee,{emailID:data.emailID});
                if(employeeData.status > 299){
                    returnData.errors.push(data.emailID)
                    if(csvData.length == returnData.csvEmails.length){
                        return returnData
                    }
                }
                else if(employeeData.status == 200 && employeeData.data[0] == null){
                    const employee = await Util.createData(Employee,data);
                    if(employee.status > 299){
                        returnData.errors.push(data.emailID)
                    }
                    else{
                        const result = await Util.saveData(Employee,employee.data[0])
                        if(result.status > 299){
                            returnData.errors.push(data.emailID)
                        }
                        if(csvData.length == returnData.csvEmails.length){
                            return returnData
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
                        returnData.errors.push(data.emailID)
                    }
                    if(csvData.length == returnData.csvEmails.length){
                        return returnData
                    }
                }
                else{
                    returnData.errors.push(data.emailID)
                    if(csvData.length == returnData.csvEmails.length){
                        return returnData
                    }
                }
            }          
        } catch (error) {
            logger.info(error)
            return {errors:[error],csvEmails:[]}
        }
    }

    async returnObj(data:Array<any>,status:number,model:string,type:string){
        const message = defaultMessages[type];
        const returnObject: returnObject = {
            data:data,
            status: status,
            message: `${model}${message}`,
        };
        return returnObject;
    }
}

export const Util = new Utils();