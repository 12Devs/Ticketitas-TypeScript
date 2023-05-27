import { NextFunction, Request, Response, Router } from 'express';
import { loginAdministratorController } from '../controllers/login administrator'
import { createAdministratorController } from '../controllers/create administrator/index'
import { changePasswordAdministratorController } from '../controllers/change password administrator/index'
import { newPasswordAdministratorController } from '../controllers/new password administrator/index'
import { refreshTokenAdministratorController } from '../controllers/refresh token administrator';
import { imageUpload } from '../utils/ImageUpload';
import { ensureAuthenticatedAdministrator } from '../middlewares/EnsureAuthenticatedAdministrator';
import { updateAvatarController } from '../controllers/update user avatar';
import { listOneAdministratorController } from '../controllers/list one administrator';
import { aprovePromoterRegistrationController } from '../controllers/approve promoter registration';
import { updateStatusPromoterController } from '../controllers/update status promoter';


const administratorRoutes = Router();

administratorRoutes.get("/administrator/:cpf", (request: Request, response: Response, next: NextFunction)=>{
    return listOneAdministratorController.handle(request, response).catch((error)=>{next(error)});
});

administratorRoutes.post("/administrator", (request: Request, response: Response, next: NextFunction)=>{
    return createAdministratorController.handle(request, response).catch((error)=>{next(error)});   
});

administratorRoutes.post("/administrator/login", (request: Request, response: Response, next: NextFunction)=>{
    return loginAdministratorController.handle(request, response).catch((error)=>{next(error)});
});

administratorRoutes.post("/administrator/change-password", (request: Request, response: Response, next: NextFunction)=>{
    return changePasswordAdministratorController.handle(request, response).catch((error)=>{next(error)});
});

administratorRoutes.post("/administrator/new-password", (request: Request, response: Response, next: NextFunction)=>{
    return newPasswordAdministratorController.handle(request, response).catch((error)=>{next(error)});
});

administratorRoutes.post("/administrator/refresh-token", (request: Request, response: Response, next: NextFunction)=>{
    return refreshTokenAdministratorController.handle(request, response).catch((error)=>{next(error)});
});

administratorRoutes.patch("/administrator/avatar", ensureAuthenticatedAdministrator, imageUpload.single("avatar"), (request: Request, response: Response, next: NextFunction)=>{
    return updateAvatarController.handle(request, response).catch((error)=>{next(error)}); 
});

administratorRoutes.patch("/administrator/aprove-registration/:promoterCpf", (request: Request, response: Response, next: NextFunction)=>{
    return aprovePromoterRegistrationController.handle(request, response).catch((error)=>{next(error)});   
});

administratorRoutes.patch("/administrator/update-status-promoter/:cpf", (request: Request, response: Response, next: NextFunction)=>{
    return updateStatusPromoterController.handle(request, response).catch((error)=>{next(error)});   
});

export { administratorRoutes };