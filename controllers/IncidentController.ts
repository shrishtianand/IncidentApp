import { Request, Response} from 'express';
import { Incident } from '../models/IncidentModel';
import { createData,saveData,deleteData } from '../utility/utils';
import { statusCodes,incMessages } from '../utility/constants';

async function createIncident(req: Request,res: Response){
    try {
        // const user = await appDataSource.getRepository(Employee).create(req.body)
        const incident = await createData(Incident,req.body);
        if(incident == "error"){
            return res.json({
                status:statusCodes.error,
                message:incMessages.incCreateError,
                data:null
            })
        }
        else{
            const result = await saveData(Incident,incident)
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

async function getIncident(req: Request,res: Response){
    try {
        // const user = await appDataSource.getRepository(Employee).create(req.body)
        const incident = await createData(Incident,req.body);
        if(incident == "error"){
            return res.json({
                status:statusCodes.error,
                message:incMessages.incCreateError,
                data:null
            })
        }
        else{
            const result = await saveData(Incident,incident)
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

async function getIncidentByID(req: Request,res: Response){
    try {
        // const user = await appDataSource.getRepository(Employee).create(req.body)
        const incident = await createData(Incident,req.body);
        if(incident == "error"){
            return res.json({
                status:statusCodes.error,
                message:incMessages.incCreateError,
                data:null
            })
        }
        else{
            const result = await saveData(Incident,incident)
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

async function getAllIncident(req: Request,res: Response){
    try {
        // const user = await appDataSource.getRepository(Employee).create(req.body)
        const incident = await createData(Incident,req.body);
        if(incident == "error"){
            return res.json({
                status:statusCodes.error,
                message:incMessages.incCreateError,
                data:null
            })
        }
        else{
            const result = await saveData(Incident,incident)
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


async function getFilteredIncident(req: Request,res: Response){
    try {
        // const user = await appDataSource.getRepository(Employee).create(req.body)
        const incident = await createData(Incident,req.body);
        if(incident == "error"){
            return res.json({
                status:statusCodes.error,
                message:incMessages.incCreateError,
                data:null
            })
        }
        else{
            const result = await saveData(Incident,incident)
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


async function deleteIncidentByID(req: Request,res: Response){
    try {
        // const user = await appDataSource.getRepository(Employee).create(req.body)
        const incident = await deleteData(Incident,req.body);
        if(incident == "error"){
            return res.json({
                status:statusCodes.error,
                message:incMessages.incCreateError,
                data:null
            })
        }
        else{
            const result = await deleteData(Incident,incident)
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
export{
    createIncident,
    getIncident,
    getIncidentByID,
    getAllIncident,
    getFilteredIncident,
    deleteIncidentByID
}