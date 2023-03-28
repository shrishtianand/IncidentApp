import { Request, Response,NextFunction} from 'express';
import Joi from "joi"
import { statusCodes,messages,empMessages,incMessages } from '../utility/constants';

async function validateCreateEmployee(req: Request,res: Response, next: NextFunction){
    var ldata = req.body;
    console.log("request data " + ldata);
    const lJoiSchema = Joi.object({
        firstName: Joi.string().required().label(empMessages.empFNameRequired),
        lastName: Joi.string().required().label(empMessages.empLNameRequired),
        emailID: Joi.string().required().label(empMessages.empEmailIDRequired),
        department: Joi.string().required().label(empMessages.empDepartmentRequired),
        client: Joi.string().required().label(empMessages.empClientRequired),
        project: Joi.string().required().label(empMessages.empProjectRequired)
    }).options({abortEarly:false});
    let lresponse = lJoiSchema.validate(ldata,{abortEarly:false});
    if(lresponse.error == undefined || lresponse.error == null){
        next();
    }
    else{             
        return res.json({
            status: statusCodes.error,
            message:messages.requiredFields,
            data: lresponse.error.details.map((error) => {return error.context.label})
        })
    }
}

async function validateDeleteEmployee(req: Request,res: Response, next: NextFunction){
    var ldata = req.body;
    const lJoiSchema = Joi.object({
        empId: Joi.number().required().label(empMessages.empEmpIDRequired)
    }).options({abortEarly:false});
    let lresponse = lJoiSchema.validate(ldata,{abortEarly:false});
    if(lresponse.error == undefined || lresponse.error == null){
        next();
    }
    else{             
        return res.json({
            status: statusCodes.error,
            message:messages.requiredFields,
            data: lresponse.error.details.map((error) => {return error.context.label})
        })
    }
}
async function validateCreateIncident(req: Request,res: Response, next: NextFunction){
    var ldata = req.body;
    console.log("reached here");
    const lJoiSchema = Joi.object({
        empID: Joi.number().required().label(incMessages.incOwnerRequired),
        createdBy: Joi.number().required().label(incMessages.incCreatedByRequired),
        description: Joi.string().required().label(incMessages.incDescRequired),
        impact: Joi.string().optional(),
        reportDateTime: Joi.string().required().label(incMessages.incReportTimeStampRequired),
        status:Joi.string().optional()
    }).options({abortEarly:false});
    let lresponse = lJoiSchema.validate(ldata,{abortEarly:false});
    console.log(lresponse);
    if(lresponse.error == undefined || lresponse.error == null){
        next();
    }
    else{      
        return res.json({
            status: statusCodes.error,
            message:messages.requiredFields,
            data: lresponse.error.details.map((error) => {return error.context.label})
        })
    }
}

async function validateGetIncidentByID(req: Request,res: Response, next: NextFunction){
    var ldata = req.body;
    const lJoiSchema = Joi.object({
        incidentID: Joi.string().required().label(incMessages.incIncidentIDRequired)
    }).options({abortEarly:false});
    let lresponse = lJoiSchema.validate(ldata,{abortEarly:false});
    if(lresponse.error == undefined || lresponse.error == null){
        next();
    }
    else{             
        return res.json({
            status: statusCodes.error,
            message:messages.requiredFields,
            data: lresponse.error.details.map((error) => {return error.context.label})
        })
    }
}

export {
    validateCreateEmployee,
    validateDeleteEmployee,
    validateCreateIncident,
    validateGetIncidentByID
}