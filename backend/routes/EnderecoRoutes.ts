//Import of the "NextFunction", "Request", "Response" and "Router" submodules of the "express" module
import { NextFunction, Request, Response, Router } from 'express';

//Import of the instances of the controllers for each system feature
import { checkCepController } from '../controllers/check cep';

/**
 * Instance of the Router class/submodule for registering routes using the Router submodule of the express API/module
 */
const enderecoRoutes = Router();

/**
 * Register the route for checking the CEP number of a given address as "/:cep", using the {@link checkCepController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */ 
enderecoRoutes.get("/:cep", (request: Request, response: Response, next: NextFunction)=>{
    return checkCepController.handle(request, response).catch((error)=>{next(error)});
});

export { enderecoRoutes };