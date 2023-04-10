import { appDataSource } from '../database/database';
import { Incidentstatus } from '../models/IncidentStatusModel';
 /* Create new status based on ProcessStep */
export class IncidentStatusService{

    static async createIncidentStatus(incidentId:number, status:string, changedBy:number){
        const statusRepository = appDataSource.getRepository(Incidentstatus);  
            const statusObject = statusRepository.create({
                
              });
        return {status,changedBy,Incident:incidentId}
    }
}