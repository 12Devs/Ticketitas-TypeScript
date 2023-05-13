import { NextFunction, Request, Response, Router } from 'express';
import {loginPromoterController} from '../controllers/login promoter'
import { createPromoterController} from '../controllers/create promoter/index'
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticatedPromoter';



const promoterRoutes = Router();

promoterRoutes.post("/client", (request: Request, response: Response, next: NextFunction)=>{
   
    return createPromoterController.handle(request, response).catch((error)=>{next(error)});
    
});

promoterRoutes.post("/login", (request: Request, response: Response, next: NextFunction)=>{
    return loginPromoterController.handle(request, response).catch((error)=>{next(error)});
});


export { promoterRoutes };