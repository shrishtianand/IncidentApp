import { configure, getLogger }  from 'log4js';
import path from 'path';
import  fs from 'fs';

configure({
  appenders: {
    out: { type: "stdout" },
    multi: {
      type: "multiFile",
      base: "logs/",
      property: "categoryName",
      extension: ".log",
      maxLogSize: 10485760,
      backups: 3,
      compress: true,
    },
  },
  categories: {
    default: {
      appenders: ["out"],
      level: "info",
    },
    app: {
      appenders: ["multi"],
      level: "debug",
    },
  },
});

async function createDir () {
  if(!fs.existsSync('logs')){
    try{
      return await fs.mkdir('logs', (err) => {
         if (err) console.log(err);
        })
    }catch(err){
      console.log(err);
    }
  }
}

createDir();
export const logger = getLogger("app");
export const fileName = async (filename) => {
  const currentfilename = path.basename(filename);
  return currentfilename;
};
module.exports = {
  logger,
  fileName,
};
