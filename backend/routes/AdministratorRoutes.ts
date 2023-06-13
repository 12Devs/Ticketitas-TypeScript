//Import of the "NextFunction", "Request", "Response" and "Router" submodules of the "express" module
import { NextFunction, Request, Response, Router } from 'express';

//Import of the instances of the controllers for each system feature
import { loginAdministratorController } from '../controllers/login administrator'
import { createAdministratorController } from '../controllers/create administrator/index'
import { changePasswordAdministratorController } from '../controllers/change password administrator/index'
import { newPasswordAdministratorController } from '../controllers/new password administrator/index'
import { refreshTokenAdministratorController } from '../controllers/refresh token administrator';
import { ensureAuthenticatedAdministrator } from '../middlewares/EnsureAuthenticatedAdministrator';
import { updateAvatarController } from '../controllers/update user avatar';
import { listOneAdministratorController } from '../controllers/list one administrator';
import { aprovePromoterRegistrationController } from '../controllers/approve promoter registration';
import { updateStatusPromoterController } from '../controllers/update status promoter';
import { updateUserCpfController } from '../controllers/update user cpf';
import { updateUserNameController } from '../controllers/update user name';
import { updateUserEmailController } from '../controllers/update user email';
import { updateUserPasswordController } from '../controllers/update user password';
import { updateUserPhoneController } from '../controllers/update user phone';
import { createSuperAdministratorController } from '../controllers/create super administrator/index';
import { generateAllEventsReportController } from '../controllers/generate all events report';

//Import of the generation code from the config file
import {SUPER_ADMIN_GENERATION_CODE as superAdminGenerationCode} from "../config/env"

/**
 * Instance of the Router class/submodule for registering routes using the Router submodule of the express API/module
 */
const administratorRoutes = Router();

/**
 * Registers the route for listing an administrator as "/user/administrator" (please note that the controller establishes the usage of a ".../:id" passage of parameter after the base route), using the {@link listOneAdministratorController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
administratorRoutes.get("/administrator", (request: Request, response: Response, next: NextFunction)=>{
    return listOneAdministratorController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Registers the route for creating an administrator type of user as "/user/administrator", using the {@link createAdministratorController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedAdministrator instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
administratorRoutes.post("/administrator", ensureAuthenticatedAdministrator, (request: Request, response: Response, next: NextFunction)=>{
    return createAdministratorController.handle(request, response).catch((error)=>{next(error)});   
});

/**
 * Registers the route for administrator login as "/user/administrator/login", using the {@link loginAdministratorController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
administratorRoutes.post("/administrator/login", (request: Request, response: Response, next: NextFunction)=>{
    return loginAdministratorController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Registers the route for requesting the change of the password of an administrator via e-mail as "/user/administrator/change-password", using the {@link changePasswordAdministratorController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before and/or after the request
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
administratorRoutes.post("/administrator/change-password", (request: Request, response: Response, next: NextFunction)=>{
    return changePasswordAdministratorController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Registers the route for updating the password of an administrator using an e-mail sent recovery code as "/user/administrator/login", using the {@link newPasswordAdministratorController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
administratorRoutes.post("/administrator/new-password", (request: Request, response: Response, next: NextFunction)=>{
    return newPasswordAdministratorController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Registers the route for refreshing the login token of an administrator as "/user/administrator/refresh-token", using the {@link refreshTokenAdministratorController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
administratorRoutes.post("/administrator/refresh-token", (request: Request, response: Response, next: NextFunction)=>{
    return refreshTokenAdministratorController.handle(request, response).catch((error)=>{next(error)});
});

//administratorRoutes.post("/administrator/update-cpf", ensureAuthenticatedAdministrator, (request: Request, response: Response, next: NextFunction)=>{
//    return updateUserCpfController.handle(request, response).catch((error)=>{next(error)}); 
//});

/**
 * Registers the route for updating an administrator's name as "/user/administrator/update-name", using the {@link updateUserNameController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedAdministrator instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
administratorRoutes.post("/administrator/update-name", ensureAuthenticatedAdministrator, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserNameController.handle(request, response).catch((error)=>{next(error)}); 
});

/**
 * Registers the route for updating an administrator's e-mail address as "/user/administrator/update-email", using the {@link updateUserEmailController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedAdministrator instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
administratorRoutes.post("/administrator/update-email", ensureAuthenticatedAdministrator, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserEmailController.handle(request, response).catch((error)=>{next(error)}); 
});

/**
 * Registers the route for updating an administrator's password as "/user/administrator/update-password", using the {@link updateUserPasswordController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedAdministrator instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
administratorRoutes.post("/administrator/update-password", ensureAuthenticatedAdministrator, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserPasswordController.handle(request, response).catch((error)=>{next(error)}); 
});

/**
 * Registers the route for updating an administrator's phone number as "/user/administrator/update-phone", using the {@link updateUserPhoneController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedAdministrator instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
administratorRoutes.post("/administrator/update-phone", ensureAuthenticatedAdministrator, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserPhoneController.handle(request, response).catch((error)=>{next(error)}); 
});

/**
 * Registers the route for requesting the creation of super administrators according to the config file as "/user/administrator/super/:id", using the {@link createSuperAdministratorController.handle} method
 * Checks the id of the request to see if it matches the generation code stored in the config files
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
administratorRoutes.get("/administrator/super/:id", (request: Request, response: Response, next: NextFunction)=>{
    const generationCode = request.params.id

    if (generationCode !== null && generationCode !== undefined && generationCode === superAdminGenerationCode) {
        return createSuperAdministratorController.handle(request, response).catch((error)=>{next(error)});
    }
    else {
        return response.status(201).json({message: "Código de Geração de Super Administradores Inválido!"})
    }
});

/**
 * Registers the route for requesting the update of the status of a promoter type of user as "/user/administrator/update-status-promoter/:cpf", using the {@link updateStatusPromoterController.handle} method
 * Uses the "cpf" passed via url parameter to determine which promoter will have their status updated
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedAdministrator instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
administratorRoutes.patch("/administrator/aprove-registration/:promoterCpf", ensureAuthenticatedAdministrator, (request: Request, response: Response, next: NextFunction)=>{
    return aprovePromoterRegistrationController.handle(request, response).catch((error)=>{next(error)});   
});

/**
 * Registers the route for requesting the update of the status of a promoter type of user as "/user/administrator/update-status-promoter/:cpf", using the {@link updateStatusPromoterController.handle} method
 * Uses the "cpf" passed via url parameter to determine which promoter will have their status updated
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedAdministrator instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
administratorRoutes.patch("/administrator/update-status-promoter/:cpf", ensureAuthenticatedAdministrator, (request: Request, response: Response, next: NextFunction)=>{
    return updateStatusPromoterController.handle(request, response).catch((error)=>{next(error)});   
});

/**
 * Registers the route for generating a report regarding all the events registered in the database as "/user/administrator/generate-event-report", using the {@link generateAllEventsReportController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedAdministrator instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
administratorRoutes.get("/administrator/generate-event-report", ensureAuthenticatedAdministrator, (request: Request, response: Response, next: NextFunction)=>{
    return generateAllEventsReportController.handle(request, response).catch((error)=>{next(error)});
});

export { administratorRoutes }; //Class export declarator