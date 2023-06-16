//Import of the "NextFunction", "Request", "Response" and "Router" submodules of the "express" module
import { NextFunction, Request, Response, Router } from 'express';

//Import of the instances of the controllers for each system feature
import { loginPromoterController } from '../controllers/login promoter'
import { createPromoterController } from '../controllers/create promoter/index'
import { changePasswordPromoterController } from '../controllers/change password promoter/index'
import { newPasswordPromoterController } from '../controllers/new password promoter/index'
import { refreshTokenPromoterController } from '../controllers/refresh token promoter';
import { imageUpload } from '../utils/ImageUpload';
import { ensureAuthenticatedPromoter } from '../middlewares/EnsureAuthenticatedPromoter';
import { updateAvatarController } from '../controllers/update user avatar';
import { updateUserCpfController } from '../controllers/update user cpf';
import { updateUserNameController } from '../controllers/update user name';
import { updateUserEmailController } from '../controllers/update user email';
import { updateUserPasswordController } from '../controllers/update user password';
import { updateUserAddressController } from '../controllers/update user address';
import { updateUserPhoneController } from '../controllers/update user phone';
import { listOnePromoterController } from '../controllers/list one promoter';
import { generateEventTicketReportController } from '../controllers/generate event ticket report';
import { listEventsForPromoterController } from '../controllers/list events for a promoter';

/**
 * Instance of the Router class/submodule for registering routes using the Router submodule of the express API/module
 */
const promoterRoutes = Router();

/**
 * Register the route for listing one promoter as "/promoter", using the {@link listOnePromoterController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 * @param ensureAuthenticatedPromoter Middleware responsible for checking if the promoter is authenticated
 */
promoterRoutes.get("/promoter", ensureAuthenticatedPromoter, (request: Request, response: Response, next: NextFunction)=>{
    return listOnePromoterController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Register the route for listing events for a promoter as "/promoter/events", using the {@link listEventsForPromoterController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 * @param ensureAuthenticatedPromoter Middleware responsible for checking if the promoter is authenticated
 */
promoterRoutes.get("/promoter/events", ensureAuthenticatedPromoter, (request: Request, response: Response, next: NextFunction)=>{
    return listEventsForPromoterController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Register the route for creating a promoter as "/promoter", using the {@link createPromoterController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
promoterRoutes.post("/promoter", (request: Request, response: Response, next: NextFunction)=>{
    return createPromoterController.handle(request, response).catch((error)=>{next(error)});   
});

/**
 * Register the route for logging in a promoter as "/promoter/login", using the {@link loginPromoterController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
promoterRoutes.post("/promoter/login", (request: Request, response: Response, next: NextFunction)=>{
    return loginPromoterController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Register the route for changing the password of a promoter as "/promoter/change-password", using the {@link changePasswordPromoterController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
promoterRoutes.post("/promoter/change-password", (request: Request, response: Response, next: NextFunction)=>{
    return changePasswordPromoterController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Register the route for creating a new password for a promoter as "/promoter/new-password", using the {@link newPasswordPromoterController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
promoterRoutes.post("/promoter/new-password", (request: Request, response: Response, next: NextFunction)=>{
    return newPasswordPromoterController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Register the route for refreshing the token of a promoter as "/promoter/refresh-token", using the {@link refreshTokenPromoterController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
promoterRoutes.post("/promoter/refresh-token", (request: Request, response: Response, next: NextFunction)=>{
    return refreshTokenPromoterController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Register the route for updating the avatar of a promoter as "/promoter/avatar", using the {@link updateAvatarController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 * @param ensureAuthenticatedPromoter Middleware responsible for checking if the promoter is authenticated
 */
promoterRoutes.patch("/promoter/avatar", ensureAuthenticatedPromoter, imageUpload.single("avatar"), (request: Request, response: Response, next: NextFunction)=>{
    return updateAvatarController.handle(request, response).catch((error)=>{next(error)}); 
});

//promoterRoutes.post("/promoter/update-cpf", ensureAuthenticatedPromoter, (request: Request, response: Response, next: NextFunction)=>{
//    return updateUserCpfController.handle(request, response).catch((error)=>{next(error)}); 
//});

/**
 * Register the route for updating user name of a promoter as "/promoter/update-name", using the {@link updateUserNameController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 * @param ensureAuthenticatedPromoter Middleware responsible for checking if the promoter is authenticated
 */
promoterRoutes.post("/promoter/update-name", ensureAuthenticatedPromoter, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserNameController.handle(request, response).catch((error)=>{next(error)}); 
});

/**
 * Register the route for updating user email of a promoter as "/promoter/update-email", using the {@link updateUserEmailController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 * @param ensureAuthenticatedPromoter Middleware responsible for checking if the promoter is authenticated
 */
promoterRoutes.post("/promoter/update-email", ensureAuthenticatedPromoter, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserEmailController.handle(request, response).catch((error)=>{next(error)}); 
});

/**
 * Register the route for updating user password of a promoter as "/promoter/update-password", using the {@link updateUserPasswordController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 * @param ensureAuthenticatedPromoter Middleware responsible for checking if the promoter is authenticated
 */
promoterRoutes.post("/promoter/update-password", ensureAuthenticatedPromoter, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserPasswordController.handle(request, response).catch((error)=>{next(error)}); 
});

/**
 * Register the route for updating user address of a promoter as "/promoter/update-address", using the {@link updateUserAddressController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 * @param ensureAuthenticatedPromoter Middleware responsible for checking if the promoter is authenticated
 */
promoterRoutes.post("/promoter/update-address", ensureAuthenticatedPromoter, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserAddressController.handle(request, response).catch((error)=>{next(error)}); 
});

/**
 * Register the route for updating user phone of a promoter as "/promoter/update-phone", using the {@link updateUserPhoneController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 * @param ensureAuthenticatedPromoter Middleware responsible for checking if the promoter is authenticated
 */
promoterRoutes.post("/promoter/update-phone", ensureAuthenticatedPromoter, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserPhoneController.handle(request, response).catch((error)=>{next(error)}); 
});

/**
 * Register the route for generating a report of the events of a promoter as "/promoter/generate-event-report/:id", using the {@link generateEventTicketReportController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next NextFunction object
 * @param error Possible error thrown by either the express API or the Error API created for this project
 * @param ensureAuthenticatedPromoter Middleware responsible for checking if the promoter is authenticated
 */
promoterRoutes.get("/promoter/generate-event-report/:id", ensureAuthenticatedPromoter, (request: Request, response: Response, next: NextFunction)=>{
    return generateEventTicketReportController.handle(request, response).catch((error)=>{next(error)}); 
});


export { promoterRoutes };