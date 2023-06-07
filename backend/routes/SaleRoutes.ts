import { NextFunction, Request, Response, Router } from 'express';
import { makePurchaseController } from '../controllers/make purchase/index';
import { ensureAuthenticatedClient } from '../middlewares/EnsureAuthenticatedClient';
import { createCheckoutController } from '../controllers/create checkout';
import { listOneCheckoutController } from '../controllers/list one checkout';

const saleRoutes = Router();

saleRoutes.post("/make-purchase", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return makePurchaseController.handle(request, response).catch((error)=>{next(error)});
});

saleRoutes.get("/checkout/:id", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return listOneCheckoutController.handle(request, response).catch((error)=>{next(error)});
});

saleRoutes.post("/checkout", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return createCheckoutController.handle(request, response).catch((error)=>{next(error)});
});


export { saleRoutes }