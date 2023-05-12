import { NextFunction, Request, Response, Router } from 'express';
import { createClientController } from '../controllers/create client/index';
import { loginClientController } from '../controllers/login client';
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticatedClient';
import { updateAvatarController } from '../controllers/update user avatar/index';
import { imageUpload } from '../utils/ImageUpload';
import { updateCardController } from '../controllers/update card/index';
import { refreshTokenClietController } from '../controllers/refresh token/index';


const clientRoutes = Router();

clientRoutes.post("/client", (request: Request, response: Response, next: NextFunction)=>{
    return createClientController.handle(request, response).catch((error)=>{next(error)});
});

clientRoutes.patch("/client/avatar", ensureAuthenticated, imageUpload.single("avatar"), (request: Request, response: Response, next: NextFunction)=>{
    return updateAvatarController.handle(request, response).catch((error)=>{next(error)}); 
});

clientRoutes.post("/client/login", (request: Request, response: Response, next: NextFunction)=>{
    return loginClientController.handle(request, response).catch((error)=>{next(error)});
});

clientRoutes.post("/client/refresh-token", (request: Request, response: Response, next: NextFunction)=>{
    return refreshTokenClietController.handle(request, response).catch((error)=>{next(error)});
});

clientRoutes.post("/client/card", (request: Request, response: Response, next: NextFunction)=>{
    return updateCardController.handle(request, response).catch((error)=>{next(error)});
});

export { clientRoutes };