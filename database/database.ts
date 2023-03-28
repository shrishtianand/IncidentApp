import "reflect-metadata"
import { DataSource } from "typeorm"
import { Employee } from "../models/EmployeeModel"
import { gDBName,gDBUsername,gDBPassword,gDBHost,gDBDialect,gDBPort } from "../config/config"
import { Incident } from "../models/IncidentModel"

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
        Incident
      ],  
})

export {
    appDataSource,
}