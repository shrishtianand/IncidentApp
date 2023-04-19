import express from 'express';
import { ListDataMasterController } from '../controllers/ListDataMasterController';
var masterRouter  = express.Router();
const dataMasterObject:ListDataMasterController = new ListDataMasterController();

masterRouter.get("/getFilterById/:id",dataMasterObject.getFilterById);

export default masterRouter;