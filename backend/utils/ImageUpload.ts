//Import of the necessary modules for the functioning of the class
import { Request } from "express";
import multer from "multer";
import crypto from "crypto";
import { ApiError } from "../errors/ApiError";


/**
 * Function that stores image
 * @date 6/15/2023 - 11:36:06 PM
 *
 * @type {*}
 */
const imageStore = multer.diskStorage({
    destination: function(request: Request, file, callBack) {
        callBack(null, `./backend/temp`);
    },
    filename: function(request: Request, file, callBack) {
        const nomeOriginal = file.originalname;
        const fileHash = crypto.randomBytes(16).toString("hex");
        const formato = nomeOriginal.slice(nomeOriginal.length - 4);
        const filename = `${fileHash}${formato}`
        return callBack(null, filename);
    }
})


/**
 * Function that uploads image
 * @date 6/15/2023 - 11:36:29 PM
 *
 * @type {*}
 */
const imageUpload = multer({
    storage: imageStore,
    fileFilter(request, file, callBack) {
        if(!file.originalname.match(/\.(png|jpg)$/)) {  //Verifica se o final do arquivo é png ou jpg
            return callBack(new ApiError("Envie somente JPG ou PNG!", 406));
        }
        callBack(undefined, true);
    }
    
});

export { imageUpload };