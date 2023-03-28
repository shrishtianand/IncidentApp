import dotenv from "dotenv";
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, `./.env.${process.env.NODE_ENV}`) });

const gport = process.env.port;
const gDBName = process.env.DB_NAME;
const gDBUsername = process.env.DB_USERNAME;
const gDBPassword = process.env.DB_PASSWORD;
const gDBHost = process.env.DB_HOST;
const gDBDialect:any = process.env.DB_DIALECT;
const gDBPort:any = process.env.DB_PORT;

export  {
    gport,
    gDBName,
    gDBUsername,
    gDBPassword,
    gDBHost,
    gDBDialect,
    gDBPort
}