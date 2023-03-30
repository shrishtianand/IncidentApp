import { Request, Response} from 'express';
import { Incidentstatus } from '../models/IncidentStatusModel';
import { Util } from '../utility/utils';
import { statusCodes } from '../utility/constants';

export class IncidentStatusController{
    getFilteredIncidentStatus(arg0: string, getFilteredIncidentStatus: any) {
        throw new Error('Method not implemented.');
    }
    getIncidentStatus(arg0: string, getIncidentStatus: any) {
        throw new Error('Method not implemented.');
    }
    async createIncident(req: Request,res: Response){
        try {            
            const incidentStatus = await Util.createData(Incidentstatus,req.body);
            if(incidentStatus.status > 299){
                return res.json(incidentStatus)
            }
            else{
                const result = await Util.saveData(Incidentstatus,incidentStatus.data)
                return res.json(result)
            }                    
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Incident','createerr')
            return res.json(returnObj)           
        }
    }
    
    async getIncident(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const incidentStatus = await Util.getAllData(Incidentstatus,req.body);
            if(incidentStatus.status > 299){
                let returnObj = await Util.returnObj([incidentStatus.data],statusCodes.error,'Incident','getallerr')
                return res.json(returnObj)
            }
            else{
                let returnObj = await Util.returnObj(incidentStatus.data,statusCodes.error,'Incident','getall')
                return res.json(returnObj)            
            }                
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Incident','getallerr')
            return res.json(returnObj)        
        }
    }
    
    async getIncidentByID(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const incidentStatus = await Util.getbyIDData(Incidentstatus,req.body);
            if(incidentStatus.status > 299){
                let returnObj = await Util.returnObj([incidentStatus.data],statusCodes.error,'Incident','getallerr')
                return res.json(returnObj)
            }
            else{
                let returnObj = await Util.returnObj(incidentStatus.data,statusCodes.error,'Incident','getall')
                return res.json(returnObj)            
            }                
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Incident','getallerr')
            return res.json(returnObj)        
        }
    }
      
    async getFilteredIncident(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const incidentStatus = await Util.getAllData(Incidentstatus,req.body);
            if(incidentStatus.status > 299){
                let returnObj = await Util.returnObj([incidentStatus.data],statusCodes.error,'IncidentStatus','getallerr')
                return res.json(returnObj)
            }
            else{
                let returnObj = await Util.returnObj(incidentStatus.data,statusCodes.error,'IncidentStatus','getall')
                return res.json(returnObj)            
            }                
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'IncidentStatus','getallerr')
            return res.json(returnObj)        
        }
    }
    
    
    async deleteIncidentByID(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const incidentStatus = await Util.deleteData(Incidentstatus,req.body);
            if(incidentStatus.status > 299){
                let returnObj = await Util.returnObj([incidentStatus.data],statusCodes.error,'IncidentStatus','getallerr')
                return res.json(returnObj)
            }
            else{
                let returnObj = await Util.returnObj(incidentStatus.data,statusCodes.error,'IncidentStatus','getall')
                return res.json(returnObj)            
            }                
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'IncidentStatus','getallerr')
            return res.json(returnObj)        
        }
    }
}
