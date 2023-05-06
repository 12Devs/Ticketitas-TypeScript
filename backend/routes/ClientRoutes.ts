import { NextFunction, Request, Response, Router } from 'express';
import { loginClientController } from '../controllers/login client/index';
import { createClientController } from '../controllers/create client/index';


const clientRoutes = Router();

clientRoutes.post("/client", (request: Request, response: Response, next: NextFunction)=>{
   
    return createClientController.handle(request, response).catch((error)=>{next(error)});
    
});

clientRoutes.post("/login", (request: Request, response: Response, next: NextFunction)=>{
    return loginClientController.handle(request, response).catch((error)=>{next(error)});
});


export { clientRoutes };