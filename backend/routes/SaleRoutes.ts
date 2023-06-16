//Import of the "NextFunction", "Request", "Response" and "Router" submodules of the "express" module
import { NextFunction, Request, Response, Router } from 'express';

//Import of the instances of the controllers for each system feature
import { makePurchaseController } from '../controllers/make purchase/index';
import { ensureAuthenticatedClient } from '../middlewares/EnsureAuthenticatedClient';
import { createCheckoutController } from '../controllers/create checkout';
import { listOneCheckoutController } from '../controllers/list one checkout';

/**
 * Instance of the Router class/submodule for registering routes using the Router submodule of the express API/module
 */
const saleRoutes = Router();

/**
 * Register the route for making a purchase as "/make-purchase", using the {@link makePurchaseController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 * @param ensureAuthenticatedClient Middleware responsible for authenticating the client
 */
saleRoutes.post("/make-purchase", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return makePurchaseController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Register the route for listing one checkout as "/checkout/:id", using the {@link listOneCheckoutController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 * @param ensureAuthenticatedClient Middleware responsible for authenticating the client
 */
saleRoutes.get("/checkout/:id", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return listOneCheckoutController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Register the route for creating a checkout as "/checkout", using the {@link createCheckoutController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 * @param ensureAuthenticatedClient Middleware responsible for authenticating the client
 */
saleRoutes.post("/checkout", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return createCheckoutController.handle(request, response).catch((error)=>{next(error)});
});


export { saleRoutes }