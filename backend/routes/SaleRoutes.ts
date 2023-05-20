import { NextFunction, Request, Response, Router } from 'express';
import { makePurchaseController } from '../controllers/make purchase/index';
import { ensureAuthenticatedClient } from '../middlewares/EnsureAuthenticatedClient';

const saleRoutes = Router();

saleRoutes.post("/make-purchase", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return makePurchaseController.handle(request, response).catch((error)=>{next(error)});
});

export { saleRoutes }