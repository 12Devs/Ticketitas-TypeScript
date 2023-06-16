//Import of the "NextFunction", "Request", "Response" and "Router" submodules of the "express" module
import { NextFunction, Request, Response, Router } from 'express';

//Import of the instances of the controllers for each system feature
import { createEventController } from '../controllers/create event';
import { listEventsController } from '../controllers/list events/index';
import { ensureAuthenticatedPromoter } from '../middlewares/EnsureAuthenticatedPromoter';
import { imageUpload } from '../utils/ImageUpload';
import { updateImageEventController } from '../controllers/update image event';
import { listOneEventController } from '../controllers/list one event/index';
import { setFeaturedEventController } from '../controllers/set featured event/index';
import { updateStatusEventController } from '../controllers/update status event';
import { ensureAuthenticatedAdministrator } from '../middlewares/EnsureAuthenticatedAdministrator';
import { listActiveEventsController } from '../controllers/list active events';

/**
 * Instance of the Router class/submodule for registering routes using the Router submodule of the express API/module
 */
const eventRoutes = Router();

/**
 * Register the route for creating a new event as "/", using the {@link createEventController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
eventRoutes.post("", (request: Request, response: Response, next: NextFunction)=>{
    return createEventController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Register the route for listing all events as "/", using the {@link listEventsController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
eventRoutes.get("", ensureAuthenticatedAdministrator, (request: Request, response: Response, next: NextFunction)=>{
    return listEventsController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Register the route for listing active events as "/active", using the {@link listActiveEventsController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */

eventRoutes.get("/active", (request: Request, response: Response, next: NextFunction)=>{
    return listActiveEventsController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Register the route for listing one event as "/:id", using the {@link listOneEventController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
eventRoutes.get("/:id", (request: Request, response: Response, next: NextFunction)=>{
    return listOneEventController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Register the route for updating the image of an event as "/image", using the {@link updateImageEventController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
eventRoutes.patch("/image", ensureAuthenticatedPromoter, imageUpload.single("imageEvent"), (request: Request, response: Response, next: NextFunction)=>{
    return updateImageEventController.handle(request, response).catch((error)=>{next(error)}); 
});

/**
 * Register the route for updating the status of an event as "/update-status", using the {@link updateStatusEventController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 * @param ensureAuthenticatedPromoter Middleware for checking if the user is a promoter
 */
eventRoutes.patch("/update-status", ensureAuthenticatedPromoter, (request: Request, response: Response, next: NextFunction)=>{
    return updateStatusEventController.handle(request, response).catch((error)=>{next(error)}); 
});

/**
 * Register the route for updating the status of an event as "/administrator/update-status", using the {@link updateStatusEventController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 * @param ensureAuthenticatedAdministrator Middleware for checking if the user is an administrator
 */
eventRoutes.patch("/administrator/update-status", ensureAuthenticatedAdministrator,(request: Request, response: Response, next: NextFunction)=>{
    return updateStatusEventController.handle(request, response).catch((error)=>{next(error)}); 
});


/**
 * Register the route for setting an event as featured as "/set-featured/:id", using the {@link setFeaturedEventController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 * @param ensureAuthenticatedAdministrator Middleware for checking if the user is a promoter
 */
eventRoutes.patch("/set-featured/:id", ensureAuthenticatedAdministrator, (request: Request, response: Response, next: NextFunction)=>{
    return setFeaturedEventController.handle(request, response).catch((error)=>{next(error)}); 
});

eventRoutes.patch("/administrator/update-status", ensureAuthenticatedAdministrator,(request: Request, response: Response, next: NextFunction)=>{
    return updateStatusEventController.handle(request, response).catch((error)=>{next(error)}); 
});

export { eventRoutes };