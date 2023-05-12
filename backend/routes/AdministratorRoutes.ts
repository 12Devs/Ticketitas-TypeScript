import { NextFunction, Request, Response, Router } from 'express';
import { loginAdministratorController } from '../controllers/login administrator/index';
import { createAdministratorController } from '../controllers/create administrator/index';
import { ensureAuthenticated } from '../middlewares/EnsureAuthenticatedAdministrator';



const administratorRoutes = Router();

administratorRoutes.post("/administrator", (request: Request, response: Response, next: NextFunction)=>{
   
    return createAdministratorController.handle(request, response).catch((error)=>{next(error)});
    
});

administratorRoutes.post("/login", (request: Request, response: Response, next: NextFunction)=>{
    return loginAdministratorController.handle(request, response).catch((error)=>{next(error)});
});


export { administratorRoutes };