import { NextFunction, Request, Response, Router } from 'express';
import {loginAdministratorController} from '../controllers/login administrator'
import { createAdministratorController} from '../controllers/create administrator/index'
import { refreshTokenAdministratorController } from '../controllers/refresh token administrator';
import { imageUpload } from '../utils/ImageUpload';
import { ensureAuthenticatedAdministrator } from '../middlewares/EnsureAuthenticatedAdministrator';
import { updateAvatarController } from '../controllers/update user avatar';


const administratorRoutes = Router();

administratorRoutes.post("/administrator", (request: Request, response: Response, next: NextFunction)=>{
    return createAdministratorController.handle(request, response).catch((error)=>{next(error)});   
});

administratorRoutes.post("/administrator/login", (request: Request, response: Response, next: NextFunction)=>{
    return loginAdministratorController.handle(request, response).catch((error)=>{next(error)});
});

administratorRoutes.post("/administrator/refresh-token", (request: Request, response: Response, next: NextFunction)=>{
    return refreshTokenAdministratorController.handle(request, response).catch((error)=>{next(error)});
});

administratorRoutes.patch("/administrator/avatar", ensureAuthenticatedAdministrator, imageUpload.single("avatar"), (request: Request, response: Response, next: NextFunction)=>{
    return updateAvatarController.handle(request, response).catch((error)=>{next(error)}); 
});


export { administratorRoutes };