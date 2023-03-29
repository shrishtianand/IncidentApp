// Import the express in typescript file
import express from 'express';
import {logger, fileName} from './log4';
import bodyParser from "body-parser";
import { gport } from './config/config';
import empRouter from './routes/EmployeeRoute';
import incidentRouter from './routes/IncidentRoute';
import incStatusRoute from './routes/IncidentStatusRoute';
import { appDataSource } from './database/database';
var fName:string;

fileName(__filename).then((data)=>{
    fName = data;
});
// establish database connection
appDataSource
    .initialize()
    .then(() => {
        logger.info(`${fName} : Data Source has been initialized!`)
    })
    .catch((err) => {
        logger.error(`${fName} : Error during Data Source initialization: ${err}`)
    })
// Initialize the express engine
const app: express.Application = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
// parse application/json
app.use(bodyParser.json({limit: '100mb'}));
app.use("/employee",empRouter);  
app.use("/incident",incidentRouter); 
app.use('/incstatus',incStatusRoute) ;
// Server setup
app.listen(gport, () => {
    logger.info(`${fName} TypeScript with Express
         http://localhost:${gport}/`);
});