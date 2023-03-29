import { appDataSource } from "../database/database"
import { logger, fileName } from "../log4";

export class Utils{
    fName: string;
    async file(){
        fileName(__filename).then((data)=>{
            this.fName = data;
        });
    }
    
    async createData(model: any,data: any){
        try {
            const createData:Array<any> = await appDataSource.getRepository(model).create(data)
            return createData;
        } catch (error) {
            logger.info(`${this.fName} : Error creating record for : ${model}`);
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
            console.log(saveData);
            return saveData;
        } catch (error) {
            logger.info(`${this.fName} : Error saving record for : ${model}`);
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