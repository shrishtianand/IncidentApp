import { NotBrackets } from 'typeorm/query-builder/NotBrackets';
import { appDataSource } from '../database/database';
import { logger } from '../log4';
import { Processstep } from '../models/ProcessStepModel';
import { Tktappr } from '../models/TktApprModule';
import { returnObject, statusCodes } from '../utility/constants';
import { Util } from '../utility/utils';

class ProcessStep
{
    static async getAllPStep(){
        try {            
            const psStep = await Util.getAllData(Processstep,{});
            if(psStep.status > 299){
                let returnObj = await Util.returnObj([psStep.data],statusCodes.error,'Processstep','getallerr')
                return returnObj
            }
            else{
                let returnObj = await Util.returnObj(psStep.data,statusCodes.success,'Processstep','getall')
                return returnObj          
            }                
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Processstep','getallerr')
            return returnObj       
        }
    }
}

class TktAppr
{
    async getCurrentTktStep()
    {
        return await appDataSource
                    .createQueryBuilder(TktAppr, "tktappr")
                    .where("tktappr.status : status", {status :  'NEW'})
                    .orderBy("tktappr.psID","ASC")
                    .getOne();
    }

    async createTktAppr(incidentId:number){
        try { 
            let sendResults:any[] = [] ; 
            const psStep = await ProcessStep.getAllPStep()
            for(let ps of psStep.data){
                let tktAppr = {}
                tktAppr =  await this.createTktApprReq(incidentId, ps.psID, ps.psName,'NEW')
                const tktStatus = await Util.createData(Tktappr,tktAppr);
                if(tktStatus.status > 299){
                    logger.info(tktStatus)
                }
                else{
                    const result = await Util.saveData(Tktappr,tktStatus.data[0])
                    sendResults.push(result.data)
                }                  
            } 
            return sendResults
        } 
        catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Tktappr','createerr')
            return [returnObj.data]      
        }
    }

    async createTktApprReq(incidentId: number, psID: number, tktName: string,tktStatus:string) {
        return {incidentId,  psID, tktStatus, tktName }
    }
}

export const tstep:TktAppr = new TktAppr();