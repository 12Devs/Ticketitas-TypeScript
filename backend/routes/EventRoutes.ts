import { NextFunction, Request, Response, Router } from 'express';
import { createEventController } from '../controllers/create event';

const eventRoutes = Router();

eventRoutes.post("", (request: Request, response: Response, next: NextFunction)=>{
   
    return createEventController.handle(request, response).catch((error)=>{next(error)});
    
});


export { eventRoutes };