import { NextFunction, Request, Response, Router } from 'express';
import { loginAdministratorController } from '../controllers/login administrator'
import { createAdministratorController } from '../controllers/create administrator/index'
import { changePasswordAdministratorController } from '../controllers/change password administrator/index'
import { newPasswordAdministratorController } from '../controllers/new password administrator/index'
import { refreshTokenAdministratorController } from '../controllers/refresh token administrator';
import { ensureAuthenticatedAdministrator } from '../middlewares/EnsureAuthenticatedAdministrator';
import { updateUserCpfController } from '../controllers/update user cpf';
import { updateUserNameController } from '../controllers/update user name';
import { updateUserEmailController } from '../controllers/update user email';
import { updateUserPasswordController } from '../controllers/update user password';
import { updateUserPhoneController } from '../controllers/update user phone';

const administratorRoutes = Router();

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

administratorRoutes.post("/administrator/update-cpf", ensureAuthenticatedAdministrator, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserCpfController.handle(request, response).catch((error)=>{next(error)}); 
});

administratorRoutes.post("/administrator/update-name", ensureAuthenticatedAdministrator, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserNameController.handle(request, response).catch((error)=>{next(error)}); 
});

administratorRoutes.post("/administrator/update-email", ensureAuthenticatedAdministrator, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserEmailController.handle(request, response).catch((error)=>{next(error)}); 
});

administratorRoutes.post("/administrator/update-password", ensureAuthenticatedAdministrator, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserPasswordController.handle(request, response).catch((error)=>{next(error)}); 
});

administratorRoutes.post("/administrator/update-phone", ensureAuthenticatedAdministrator, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserPhoneController.handle(request, response).catch((error)=>{next(error)}); 
});


export { administratorRoutes };