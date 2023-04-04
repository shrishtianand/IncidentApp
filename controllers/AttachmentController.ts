import { Request, Response } from 'express';
import { Incident } from '../models/IncidentModel';
import { Attachment } from '../models/AttachmentModel';
import { appDataSource } from '../database/database';

/**
 * 
 * @param req : API requst from form-data including file and text fields
 * @param res : Json response or error ; Json response include the file/attachment details info
 * @returns  : res
 */
export const createAttachment = async (req: Request, res: Response) => {
  try {
    const { IncidentId} = req.body;
    const incidentRepository = appDataSource.getRepository(Incident);
    const incident = await incidentRepository.findOne({
      where: {
          IncidentId: IncidentId
      },
  });
    console.log(incident);

    if (!incident) {
      return res.status(404).send('incident not found');
    }

    const attachmentRepository = appDataSource.getRepository(Attachment);
    const Attachments = [];
    console.log(`no of files upload are : ${req.files.length}`);
    const noOffiles = req.files.length;

    for (let i = 0; i < +req.files.length; i++) {
      const Attachment = attachmentRepository.create({
        name: req.files[i].originalname,
        Incident:IncidentId,
      });
      Attachments.push(Attachment);
      await attachmentRepository.save(Attachment);
    }

    res.status(201).send(Attachments);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};