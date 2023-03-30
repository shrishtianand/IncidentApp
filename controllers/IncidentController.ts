import { Request, Response} from 'express';
import { Incident } from '../models/IncidentModel';
import { Incidentstatus } from '../models/IncidentStatusModel';
import { Util } from '../utility/utils';
import { statusCodes } from '../utility/constants';

export class IncidentController{
    async createIncident(req: Request,res: Response){
        try {            
            const incident = await Util.createData(Incident,req.body);
            if(incident.status > 299){
                return res.json(incident)
            }
            else{
                const result = await Util.saveData(Incident,incident.data)
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
            const incident = await Util.getAllData(Incident,req.body);
            if(incident.status > 299){
                let returnObj = await Util.returnObj([incident.data],statusCodes.error,'Incident','getallerr')
                return res.json(returnObj)
            }
            else{
                let returnObj = await Util.returnObj(incident.data,statusCodes.error,'Incident','getall')
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
            const incident = await Util.getbyIDData(Incident,req.body);
            if(incident.status > 299){
                let returnObj = await Util.returnObj([incident.data],statusCodes.error,'Incident','getallerr')
                return res.json(returnObj)
            }
            else{
                let returnObj = await Util.returnObj(incident.data,statusCodes.error,'Incident','getall')
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
            const incident = await Util.getAllData(Incident,req.body);
            if(incident.status > 299){
                let returnObj = await Util.returnObj([incident.data],statusCodes.error,'Incident','getallerr')
                return res.json(returnObj)
            }
            else{
                let returnObj = await Util.returnObj(incident.data,statusCodes.error,'Incident','getall')
                return res.json(returnObj)            
            }                
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Incident','getallerr')
            return res.json(returnObj)        
        }
    }
    
    
    async deleteIncidentByID(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const incident = await Util.deleteData(Incident,req.body);
            if(incident.status > 299){
                let returnObj = await Util.returnObj([incident.data],statusCodes.error,'Incident','getallerr')
                return res.json(returnObj)
            }
            else{
                let returnObj = await Util.returnObj(incident.data,statusCodes.error,'Incident','getall')
                return res.json(returnObj)            
            }                
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Incident','getallerr')
            return res.json(returnObj)        
        }
    }
}
