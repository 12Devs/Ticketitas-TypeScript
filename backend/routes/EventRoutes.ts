import { NextFunction, Request, Response, Router } from 'express';
import { createEventController } from '../controllers/create event';
import { listEventsController } from '../controllers/list events/index';
import { ensureAuthenticatedPromoter } from '../middlewares/EnsureAuthenticatedPromoter';
import { imageUpload } from '../utils/ImageUpload';
import { updateImageEventController } from '../controllers/update image event';
import { listOneEventController } from '../controllers/list one event/index';
import { setFeaturedEventController } from '../controllers/set featured event/index';
import { ensureAuthenticatedAdministrator } from '../middlewares/EnsureAuthenticatedAdministrator';

const eventRoutes = Router();

eventRoutes.post("", (request: Request, response: Response, next: NextFunction)=>{
    return createEventController.handle(request, response).catch((error)=>{next(error)});
});

eventRoutes.get("", (request: Request, response: Response, next: NextFunction)=>{
    return listEventsController.handle(request, response).catch((error)=>{next(error)});
});

eventRoutes.get("/:id", (request: Request, response: Response, next: NextFunction)=>{
    return listOneEventController.handle(request, response).catch((error)=>{next(error)});
});

eventRoutes.patch("/image", ensureAuthenticatedPromoter, imageUpload.single("imageEvent"), (request: Request, response: Response, next: NextFunction)=>{
    return updateImageEventController.handle(request, response).catch((error)=>{next(error)}); 
});

eventRoutes.patch("/set-featured/:id", (request: Request, response: Response, next: NextFunction)=>{
    return setFeaturedEventController.handle(request, response).catch((error)=>{next(error)}); 
});

export { eventRoutes };