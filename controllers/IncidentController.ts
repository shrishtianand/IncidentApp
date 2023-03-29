import { Request, Response} from 'express';
import { Incident } from '../models/IncidentModel';
import { Utils } from '../utility/utils';
import { statusCodes,incMessages } from '../utility/constants';

export class IncidentController{
    private util:Utils = new Utils();
    async createIncident(req: Request,res: Response){
        try {            
            const incident:Array<Incident> = await this.util.createData(Incident,req.body);
            if(incident == null){
                return res.json({
                    status:statusCodes.error,
                    message:incMessages.incCreateError,
                    data:incident
                })
            }
            else{
                const result = await this.util.saveData(Incident,incident)
                if(result == null){
                    return res.json({
                        status:statusCodes.error,
                        message:incMessages.incSaveError,
                        data:null
                    })
                }
                else{
                    return res.json({
                        status:statusCodes.success,
                        message:incMessages.incCreatedSuccessfully,
                        data:'success',
                        result: result
                    })
                }
            }
                    
        } catch (error) {
            return res.json({
                status:statusCodes.error,
                message:incMessages.incCreateError,
                data:error
            })        
        }
    }
    
    async getIncident(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const incident:Array<Incident> = await this.util.createData(Incident,req.body);
            if(incident == null){
                return res.json({
                    status:statusCodes.error,
                    message:incMessages.incCreateError,
                    data:null
                })
            }
            else{
                const result = await this.util.saveData(Incident,incident)
                if(result == "error"){
                    return res.json({
                        status:statusCodes.error,
                        message:incMessages.incSaveError,
                        data:null
                    })
                }
                else{
                    return res.json({
                        status:statusCodes.success,
                        message:incMessages.incCreatedSuccessfully,
                        data:result
                    })
                }
            }
                    
        } catch (error) {
            return res.json({
                status:statusCodes.error,
                message:incMessages.incCreateError,
                data:error
            })        
        }
    }
    
    async getIncidentByID(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const incident = await this.util.getbyIDData(Incident,req.body);
            if(incident == null){
                return res.json({
                    status:statusCodes.error,
                    message:incMessages.incCreateError,
                    data:null
                })
            }
            else{
                const result = await this.util.saveData(Incident,incident)
                if(result == null){
                    return res.json({
                        status:statusCodes.error,
                        message:incMessages.incSaveError,
                        data:null
                    })
                }
                else{
                    return res.json({
                        status:statusCodes.success,
                        message:incMessages.incCreatedSuccessfully,
                        data:result
                    })
                }
            }
                    
        } catch (error) {
            return res.json({
                status:statusCodes.error,
                message:incMessages.incCreateError,
                data:error
            })        
        }
    }
      
    async getFilteredIncident(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const incident = await this.util.getAllData(Incident,req.body);
            if(incident == null){
                return res.json({
                    status:statusCodes.error,
                    message:incMessages.incCreateError,
                    data:null
                })
            }
            else{
            
                return res.json({
                    status:statusCodes.success,
                    message:incMessages.incCreatedSuccessfully,
                    data:incident
                })
                
            }
                    
        } catch (error) {
            return res.json({
                status:statusCodes.error,
                message:incMessages.incCreateError,
                data:error
            })        
        }
    }
    
    
    async deleteIncidentByID(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const incident = await this.util.deleteData(Incident,req.body);
            if(incident == null){
                return res.json({
                    status:statusCodes.error,
                    message:incMessages.incCreateError,
                    data:null
                })
            }
            else{
                const result = await this.util.deleteData(Incident,incident)
                if(result == null){
                    return res.json({
                        status:statusCodes.error,
                        message:incMessages.incSaveError,
                        data:null
                    })
                }
                else{
                    return res.json({
                        status:statusCodes.success,
                        message:incMessages.incCreatedSuccessfully,
                        data:result
                    })
                }
            }
                    
        } catch (error) {
            return res.json({
                status:statusCodes.error,
                message:incMessages.incCreateError,
                data:error
            })        
        }
    }
}
