//Import of the necessary modules for the functioning of the class
import QRCode from 'qrcode';


/**
 * Function that generates a qr code
 * @date 6/15/2023 - 11:35:47 PM
 *
 * @async
 * @param {*} fileName
 * @param {string} content
 * @returns {*}
 */
const generateQrCode = async (fileName, content: string) => {

    await QRCode.toFile(`backend/temp/${fileName}.jpg`, `${content}`, {
        errorCorrectionLevel: 'H'
      }, function(err) {
        if (err) throw err;
      });
}
    
export { generateQrCode };