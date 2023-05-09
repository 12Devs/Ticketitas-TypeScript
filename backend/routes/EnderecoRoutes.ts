import { NextFunction, Request, Response, Router } from 'express';
import { checkCepController } from '../controllers/check cep';

const enderecoRoutes = Router();

enderecoRoutes.get("/complet", (request: Request, response: Response, next: NextFunction)=>{
    return checkCepController.handle(request, response).catch((error)=>{next(error)});
});

export { enderecoRoutes };