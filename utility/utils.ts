import { appDataSource } from "../database/database"
import { logger, fileName } from "../log4";
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
            return returnObject;
        }
    }

    async updateData(model: any,data: any){
        let modelName = model.name;
        try {
            const createData = await appDataSource.getRepository(model).update(data, true)
            let returnObject = this.returnObj([createData],statusCodes.success,modelName,'create');
            logger.info(`${this.fName} : Successfully updated record for : ${modelName}`);
            return returnObject;
        } catch (error) {
            logger.info(`${this.fName} : Error updating record for : ${modelName}`);
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
            let returnObject = this.returnObj([error],statusCodes.error,modelName,'saveerr');
            return returnObject;
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