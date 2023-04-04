import express from 'express';
import multer from 'multer';
import { createAttachment } from '../controllers/AttachmentController';
import path from 'path';
var attachmentRouter  = express.Router();

/**
 *Multer package is used to upload the file data into the server.
 Also, the server details, file parameters can be customized. 
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'attachments/')
  },
  filename: function (req, file, cb) {
cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)

  }
})

const upload = multer({ storage: storage })
//multer takes the array of files
attachmentRouter.post('/attachments', upload.array('attachments'), createAttachment);
export default attachmentRouter;