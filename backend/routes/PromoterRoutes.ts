import { NextFunction, Request, Response, Router } from 'express';
import {loginPromoterController} from '../controllers/login promoter'
import { createPromoterController} from '../controllers/create promoter/index'
import { refreshTokenPromoterController } from '../controllers/refresh token promoter';



const promoterRoutes = Router();

promoterRoutes.post("/promoter", (request: Request, response: Response, next: NextFunction)=>{
    return createPromoterController.handle(request, response).catch((error)=>{next(error)});   
});

promoterRoutes.post("/promoter/login", (request: Request, response: Response, next: NextFunction)=>{
    return loginPromoterController.handle(request, response).catch((error)=>{next(error)});
});

promoterRoutes.post("/promoter/refresh-token", (request: Request, response: Response, next: NextFunction)=>{
    return refreshTokenPromoterController.handle(request, response).catch((error)=>{next(error)});
});


export { promoterRoutes };