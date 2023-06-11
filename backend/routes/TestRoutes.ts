import { NextFunction, Request, Response, Router } from 'express';
import { loginPromoterController } from '../controllers/login promoter'
import { createPromoterController } from '../controllers/create promoter/index'
import { editEventController } from '../controllers/edit event/index'
import { eventReportController } from '../controllers/event report/index';

const testRoutes = Router();

testRoutes.post("/EditEvent", (request: Request, response: Response, next: NextFunction) => {
    return editEventController.handle(request, response).catch((error) => { next(error) });
});

testRoutes.post("/EventReport", (request: Request, response: Response, next: NextFunction) => {
    return eventReportController.handle(request, response).catch((error) => { next(error) });
});

export { testRoutes };
