import { NextFunction, Request, Response, Router } from 'express';
import { loginPromoterController } from '../controllers/login promoter'
import { removePromoterController } from '../controllers/Remove Promoter/index'
import { editEventController } from '../controllers/edit event/index'


const testRoutes = Router();


testRoutes.post("/EditEvent", (request: Request, response: Response, next: NextFunction)=>{
    return editEventController.handle(request, response).catch((error)=>{next(error)});   
});


testRoutes.post("/RemovePromoter", (request: Request, response: Response, next: NextFunction)=>{
    return removePromoterController.handle(request, response).catch((error)=>{next(error)});   
});




export { testRoutes };