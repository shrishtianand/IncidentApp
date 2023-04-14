
 /* Create new status based on ProcessStep */
export class IncidentStatusService{

    static async createIncidentStatus(incidentId:number, status:string, changedBy:number){
        return {status,changedBy,incidentId}
    }
}