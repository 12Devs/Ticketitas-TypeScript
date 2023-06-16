//Import of the necessary modules for the functioning of the class
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';


/**
 * Function that uploads a file to google storage
 * @date 6/15/2023 - 11:37:31 PM
 *
 * @async
 * @param {*} fileObject
 * @returns {unknown}
 */
const uploadFileStorage = async (fileObject: any) => {
    const KEYFILEPATH = path.join('backend/config/googleStorage.json');
    const SCOPES = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES,
    });

    const { data } = await google.drive({ version: 'v3', auth }).files.create({
      media: {
        mimeType: 'image/jpg',
        body:  fs.createReadStream(fileObject.path),
      },
      requestBody: {
        name: fileObject.filename,
        parents: ['1SAW9W8vOjaSfKNrDHWvNxkI-qBVwoj8Z'],
      },
      fields: 'id,name',
    });
    return data;
};


/**
 * Function that deletes a file from google storage
 * @date 6/15/2023 - 11:37:42 PM
 *
 * @async
 * @param {string} fileId
 * @returns {*}
 */
const deleteFileStorage = async (fileId: string) => {
    const KEYFILEPATH = path.join('backend/config/googleStorage.json');
    const SCOPES = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES,
    });

    await google.drive({ version: 'v3', auth }).files.delete({ 'fileId': fileId });
};

export { uploadFileStorage, deleteFileStorage }