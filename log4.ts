import { configure, getLogger }  from 'log4js';
import path from 'path';

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

export const logger = getLogger("index");
export const fileName = async (filename) => {
  const currentfilename = path.basename(filename);
  return currentfilename;
};
module.exports = {
  logger,
  fileName,
};
