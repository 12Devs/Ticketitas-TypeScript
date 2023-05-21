import { NextFunction, Request, Response, Router } from 'express';
import { listHighlightsController } from '../controllers/list highlights';


const highlightsRoutes = Router();

highlightsRoutes.get("", (request: Request, response: Response, next: NextFunction)=>{
    return listHighlightsController.handle(request, response).catch((error)=>{next(error)});
});

export { highlightsRoutes }
