//Import of the "NextFunction", "Request", "Response" and "Router" submodules of the "express" module
import { NextFunction, Request, Response, Router } from 'express';

//Import of the instances of the controllers for each system feature
import { listHighlightsController } from '../controllers/list highlights';

/**
 * Instance of the Router class/submodule for registering routes using the Router submodule of the express API/module
 */
const highlightsRoutes = Router();

/**
 * Register the route for listing all highlights as "/", using the {@link listHighlightsController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
highlightsRoutes.get("", (request: Request, response: Response, next: NextFunction)=>{
    return listHighlightsController.handle(request, response).catch((error)=>{next(error)});
});

export { highlightsRoutes }
