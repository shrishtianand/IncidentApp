import "reflect-metadata"
import { DataSource } from "typeorm"
import { Employee } from "../models/EmployeeModel"
import { gDBName,gDBUsername,gDBPassword,gDBHost,gDBDialect,gDBPort } from "../config/config"
import { Incident } from "../models/IncidentModel"
import { Incidentstatus } from "../models/IncidentStatusModel"
import { Attachment } from "../models/AttachmentModel"
import { Processstep } from "../models/ProcessStepModel"
import { Tktappr } from "../models/TktApprModule"
import { Listdatamaster } from "../models/ListDataMasterModule"
import { Listdatadetails } from "../models/ListDataDetailsModels"

const appDataSource = new DataSource({
    type: gDBDialect,
    host: gDBHost,
    port: gDBPort,
    username: gDBUsername,
    password: gDBPassword,
    database: gDBName,
    synchronize: true,
    logging: false,
    entities: [
        Employee,   
        Incident,
        Incidentstatus,
        Attachment,
        Processstep,
        Tktappr,
        Listdatamaster,
        Listdatadetails
      ],  
})

export {
    appDataSource,
}