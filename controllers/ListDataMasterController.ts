import { Request, Response} from 'express';
import { Util } from '../utility/utils';
import { Listdatamaster } from '../models/ListDataMasterModule';
import { statusCodes } from '../utility/constants';

export class ListDataMasterController{
    async  getFilterById(req: Request,res: Response){
        const lparams = req.params
        try {
            const master = await Util.getbyIDData(Listdatamaster,{lstMstCode:lparams.id});
            if(master.status > 299){
                return res.json(master)
            }
            else{
                let returnObj = await Util.returnObj(master.data,statusCodes.success,lparams.id,'getall')
                return res.json(returnObj) 
            }       
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,lparams.id,'getall')
            return res.json(returnObj)        
        }
    }
}