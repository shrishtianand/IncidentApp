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
            const returnObject: returnObject = {
                data: createData,
                status: statusCodes.success,
                message: empMessages.empCreatedSuccessfully,
            };
            return returnObject;
        } catch (error) {
            console.log("error",error)
            logger.info(`${this.fName} : Error creating record for : ${model}`);
            const returnObject: returnObject = {
                data: error,
                status: statusCodes.error,
                message: empMessages.empCreateError,
              };
            return returnObject;
        }
    }

    async getAllData(model: any,data: any){
        try {
            const createData = await appDataSource.getRepository(model).find(data)
            return createData;
        } catch (error) {
            logger.info(`${this.fName} : Error retriving record(s)for : ${model}`);
        }
    }

    async getbyIDData(model: any,data: any){
        try {
            const createData = await appDataSource.getRepository(model).findOneBy(data)
            return createData;
        } catch (error) {
            logger.info(`${this.fName} : Error retriving record for : ${model}`);
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
}

export const Util = new Utils();