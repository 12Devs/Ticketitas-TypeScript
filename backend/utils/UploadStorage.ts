import { google } from 'googleapis';
import stream from 'stream';
import fs from 'fs';
import path from 'path';

const uploadFileStorage = async (fileObject: any) => {
    const KEYFILEPATH = path.join('backend/config/googleStorage.json');
    const SCOPES = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES,
    });

    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);

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