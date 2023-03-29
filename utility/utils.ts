import { appDataSource } from "../database/database"
import { logger, fileName } from "../log4";
import { empMessages, returnObject, statusCodes } from "./constants";

class Utils{
    fName: string;
    async file(){
        fileName(__filename).then((data)=>{
            this.fName = data;
        });
    }
    
    async createData(model: any,data: any){
        try {
            const createData = await appDataSource.getRepository(model).create(data)
            let returnObject = await this.returnArrayObjFunction(statusCodes.success,empMessages.empCreatedSuccessfully,createData);
            return returnObject;
        } catch (error) {
            logger.info(`${this.fName} : Error creating record for : ${model}`);
            let returnObject = await this.returnArrayObjFunction(statusCodes.error,empMessages.empCreatedSuccessfully,error);
            return returnObject;
        }
    }

    async getAllData(model: any,data: any){
        try {
            const createData = await appDataSource.getRepository(model).find(data)
            const returnObject: returnObject = {
                data: createData,
                status: statusCodes.success,
                message: empMessages.empCreatedSuccessfully,
            };
            return returnObject;
        } catch (error) {
            logger.info(`${this.fName} : Error retriving record(s)for : ${model}`);
            const returnObject: returnObject = {
                data: [error],
                status: statusCodes.error,
                message: empMessages.getAllEmpsErr,
            };
            return returnObject;
        }
    }

    async getbyIDData(model: any,data: any){
        try {
            const createData = await appDataSource.getRepository(model).findOneBy(data)
            const returnObject: returnObject = {
                data: [createData],
                status: statusCodes.success,
                message: empMessages.empCreatedSuccessfully,
            };
            return returnObject;
        } catch (error) {
            logger.info(`${this.fName} : Error retriving record for : ${model}`);
            const returnObject: returnObject = {
                data: [error],
                status: statusCodes.error,
                message: empMessages.empNotFound,
            };
            return returnObject;
        }
    }

    async saveData(model: any,data: any){
        try {
            const saveData = await appDataSource.getRepository(model).save(data)
            const returnObject: returnObject = {
                data: saveData,
                status: statusCodes.error,
                message: empMessages.empCreatedSuccessfully,
              };
            return returnObject;
        } catch (error) {
            logger.info(`${this.fName} : Error saving record for : ${model}`);
            const returnObject: returnObject = {
                data: error,
                status: statusCodes.error,
                message: empMessages.empSaveError,
              };
            return returnObject;
        }
    }

    async deleteData(model: any,data: any){
        try {
            const deleteData = await appDataSource.getRepository(model).delete(data)
            return deleteData;
        } catch (error) {
            logger.info(`${this.fName} : Error deleting record for : ${model}`);
        }
    }

    async returnArrayObjFunction(status:number,message:string,data:Array<any>){
        const returnObject: returnObject = {
            data: [data],
            status: status,
            message: message,
        };

        return returnObject;
    }
}

export const Util = new Utils();