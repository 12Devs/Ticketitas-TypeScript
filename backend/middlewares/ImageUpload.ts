import { Request } from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { ApiError } from "../errors/api.errors";

const imageStore = multer.diskStorage({
    destination: function(request: Request, file, callBack) {

        let folder = ""

        if(request.baseUrl.includes("user")) {
            folder = "profiles"
        } else if(request.baseUrl.includes("event")){
            folder = "events"
        }

        callBack(null, `./backend/uploadImages/${folder}`);
    },
    filename: function(request: Request, file, callBack) {
        const nomeOriginal = file.originalname;
        const fileHash = crypto.randomBytes(16).toString("hex");
        const formato = nomeOriginal.slice(nomeOriginal.length - 4);
        const filename = `${fileHash}${formato}`
        return callBack(null, filename);
    }
})

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