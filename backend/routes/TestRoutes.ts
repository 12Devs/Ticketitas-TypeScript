//Import of the "NextFunction", "Request", "Response" and "Router" submodules of the "express" module
import { NextFunction, Request, Response, Router } from 'express';

//import of the instances of the controllers for each system feature
import { loginPromoterController } from '../controllers/login promoter'
import { editEventController } from '../controllers/edit event/index'


/**
 * Instance of the Router class/submodule for registering routes using the Router submodule of the express API/module
 */
const testRoutes = Router();


/**
 * Register the route for editing an event as "/EditEvent", using the {@link editEventController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
testRoutes.post("/EditEvent", (request: Request, response: Response, next: NextFunction)=>{
    return editEventController.handle(request, response).catch((error)=>{next(error)});   
});

/**
 * Register the route for generating an event report as "/EventReport", using the {@link eventReportController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
testRoutes.post("/EventReport", (request: Request, response: Response, next: NextFunction) => {
    return eventReportController.handle(request, response).catch((error) => { next(error) });
});

// testRoutes.post("/RemovePromoter", (request: Request, response: Response, next: NextFunction)=>{
//     return removePromoterController.handle(request, response).catch((error)=>{next(error)});   
// });




export { testRoutes };