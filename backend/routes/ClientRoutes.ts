import { NextFunction, Request, Response, Router } from 'express';
import { createClientController } from '../controllers/create client/index';
import { loginClientController } from '../controllers/login client';
import { changePasswordClientController } from '../controllers/change password client/index'
import { newPasswordClientController } from '../controllers/new password client/index'
import { ensureAuthenticatedClient } from '../middlewares/EnsureAuthenticatedClient';
import { updateAvatarController } from '../controllers/update user avatar/index';
import { imageUpload } from '../utils/ImageUpload';
import { updateCardController } from '../controllers/update card/index';
import { refreshTokenClientController } from '../controllers/refresh token client/index';
import { listOneClientController } from '../controllers/list one client';
import { listTicketsForClientController } from '../controllers/list tickets for a client';

const clientRoutes = Router();

clientRoutes.get("/client/:cpf", (request: Request, response: Response, next: NextFunction)=>{
    return listOneClientController.handle(request, response).catch((error)=>{next(error)});
});

clientRoutes.get("/client/ticket/:clientCpf", (request: Request, response: Response, next: NextFunction)=>{
    return listTicketsForClientController.handle(request, response).catch((error)=>{next(error)});
});

clientRoutes.post("/client", (request: Request, response: Response, next: NextFunction)=>{
    return createClientController.handle(request, response).catch((error)=>{next(error)});
});

clientRoutes.patch("/client/avatar", ensureAuthenticatedClient, imageUpload.single("avatar"), (request: Request, response: Response, next: NextFunction)=>{
    return updateAvatarController.handle(request, response).catch((error)=>{next(error)}); 
});

clientRoutes.post("/client/login", (request: Request, response: Response, next: NextFunction)=>{
    return loginClientController.handle(request, response).catch((error)=>{next(error)});
});

clientRoutes.post("/client/change-password", (request: Request, response: Response, next: NextFunction)=>{
    return changePasswordClientController.handle(request, response).catch((error)=>{next(error)});
});

clientRoutes.post("/client/new-password", (request: Request, response: Response, next: NextFunction)=>{
    return newPasswordClientController.handle(request, response).catch((error)=>{next(error)});
});

clientRoutes.post("/client/refresh-token", (request: Request, response: Response, next: NextFunction)=>{
    return refreshTokenClientController.handle(request, response).catch((error)=>{next(error)});
});

clientRoutes.post("/client/card", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return updateCardController.handle(request, response).catch((error)=>{next(error)});
});

export { clientRoutes };