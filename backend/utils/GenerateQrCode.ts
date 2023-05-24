import QRCode from 'qrcode';

const generateQrCode = async (fileName, content: string) => {

    await QRCode.toFile(`backend/temp/${fileName}.jpg`, `${content}`, {
        errorCorrectionLevel: 'H'
      }, function(err) {
        if (err) throw err;
      });
}
    
export { generateQrCode };