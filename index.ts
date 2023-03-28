// Import the express in typescript file
import express from 'express';
import bodyParser from "body-parser";
import { gport } from './config/config';
import empRouter from './routes/employee';
import  incidentRouter from './routes/IncidentRoute';
import { appDataSource } from './database/database';

// establish database connection
appDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })
// Initialize the express engine
const app: express.Application = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
// parse application/json
app.use(bodyParser.json({limit: '100mb'}));
app.use("/employee",empRouter);  
app.use("/incident",incidentRouter);  
// Server setup
app.listen(gport, () => {
    console.log(`TypeScript with Express
         http://localhost:${gport}/`);
});