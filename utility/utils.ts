import { appDataSource } from "../database/database"
import { logger, fileName } from "../log4";
import { returnObject, statusCodes, defaultMessages } from "./constants";

class Utils{
    fName: string;
    async file(){
        fileName(__filename).then((data)=>{
            this.fName = data;
        });
    }
    
    async createData(model: any,data: any){
        let modelName = model.name;
        try {
            const createData = await appDataSource.getRepository(model).create(data)
            let returnObject = this.returnObj([createData],statusCodes.success,modelName,'create');
            return returnObject;
        } catch (error) {
            logger.info(`${this.fName} : Error creating record for : ${model}`);
            let returnObject = this.returnObj([error],statusCodes.error,modelName,'createerr');
            return returnObject;
        }
    }

    async getAllData(model: any,data: any){
        let modelName = model.name;
        try {
            const createData = await appDataSource.getRepository(model).find(data)
            let returnObject = this.returnObj(createData,statusCodes.success,modelName,'getall');
            return returnObject;
        } catch (error) {
            logger.info(`${this.fName} : Error retriving record(s)for : ${model}`);
            let returnObject = this.returnObj([error],statusCodes.error,modelName,'getallerr');
            return returnObject;
        }
    }

    async getbyIDData(model: any,data: any){
        let modelName = model.name;
        try {
            const createData = await appDataSource.getRepository(model).findOneBy(data)
            let returnObject = this.returnObj([createData],statusCodes.success,modelName,'getsingle');
            return returnObject;
        } catch (error) {
            logger.info(`${this.fName} : Error retriving record for : ${model}`);
            let returnObject = this.returnObj([error],statusCodes.error,modelName,'getsingleerr');
            return returnObject;
        }
    }

    async saveData(model: any,data: any){
        let modelName = model.name;
        try {
            const saveData = await appDataSource.getRepository(model).save(data)
            let returnObject = this.returnObj(saveData,statusCodes.success,modelName,'save');
            return returnObject;
        } catch (error) {
            logger.info(`${this.fName} : Error saving record for : ${model}`);
            let returnObject = this.returnObj([error],statusCodes.error,modelName,'saveerr');
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