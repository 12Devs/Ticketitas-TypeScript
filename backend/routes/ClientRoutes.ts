//Import of the "NextFunction", "Request", "Response" and "Router" submodules of the "express" module
import { NextFunction, Request, Response, Router } from 'express';

//Import of the instances of the controllers for each system feature
import { createClientController } from '../controllers/create client/index';
import { loginClientController } from '../controllers/login client';
import { changePasswordClientController } from '../controllers/change password client/index'
import { newPasswordClientController } from '../controllers/new password client/index'
import { ensureAuthenticatedClient } from '../middlewares/EnsureAuthenticatedClient';
import { updateAvatarController } from '../controllers/update user avatar/index';
import { imageUpload } from '../utils/ImageUpload';
import { updateCardController } from '../controllers/update card/index';
import { refreshTokenClientController } from '../controllers/refresh token client/index';
import { updateUserCpfController } from '../controllers/update user cpf';
import { updateUserNameController } from '../controllers/update user name';
import { updateUserEmailController } from '../controllers/update user email';
import { updateUserPasswordController } from '../controllers/update user password';
import { updateUserAddressController } from '../controllers/update user address';
import { updateUserPhoneController } from '../controllers/update user phone';
import { listOneClientController } from '../controllers/list one client';
import { listTicketsForClientController } from '../controllers/list tickets for a client';
import { listOneCardController } from '../controllers/list one card';
import { generateClientTicketReportController } from '../controllers/generate client ticket report';


/**
 * Instance of the Router class/submodule for registering routes using the Router submodule of the express API/module
 */
const clientRoutes = Router();

/**
 * Registers the route for listing a client as "/user/client" (please note that the controller establishes the usage of a ".../:id" passage of parameter after the base route), using the {@link listOneClientController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
clientRoutes.get("/client", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return listOneClientController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Registers the route for listing all Tickets for a client, using the {@link listTicketsForClientController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedClient instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
clientRoutes.get("/client/ticket", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return listTicketsForClientController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Registers the route for creating a client type of user as "/user/client", using the {@link createClientController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
clientRoutes.post("/client", (request: Request, response: Response, next: NextFunction)=>{
    return createClientController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Registers the route for updating the avatar of a client type of user as "/user/client/avatar", using the {@link updateAvatarController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedClient instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param imageUpload instance of the image upload middleware class used to upload the image to the server
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
clientRoutes.patch("/client/avatar", ensureAuthenticatedClient, imageUpload.single("avatar"), (request: Request, response: Response, next: NextFunction)=>{
    return updateAvatarController.handle(request, response).catch((error)=>{next(error)}); 
});
/**
 * Registers the route for Client login as "/user/client/login", using the {@link loginClientController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
clientRoutes.post("/client/login", (request: Request, response: Response, next: NextFunction)=>{
    return loginClientController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Registers the route for changing the password of a client type of user as "/user/client/change-password", using the {@link changePasswordClientController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param error Possible error thrown by either the express API or the Error API created for this project 
 */
clientRoutes.post("/client/change-password", (request: Request, response: Response, next: NextFunction)=>{
    return changePasswordClientController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Registers the route for the new passwords of a client type of user as "/user/client/new-password", using the {@link newPasswordClientController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param error Possible error thrown by either the express API or the Error API created for this project 
 */
clientRoutes.post("/client/new-password", (request: Request, response: Response, next: NextFunction)=>{
    return newPasswordClientController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Registers the route for refreshing the token of a client type of user as "/user/client/refresh-token", using the {@link refreshTokenClientController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param error Possible error thrown by either the express API or the Error API created for this project 
 */
clientRoutes.post("/client/refresh-token", (request: Request, response: Response, next: NextFunction)=>{
    return refreshTokenClientController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Registers the route for updating the card of a client type of user as "/user/client/card", using the {@link updateCardController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedClient instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
clientRoutes.post("/client/card", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return updateCardController.handle(request, response).catch((error)=>{next(error)});
});

/**
 * Registers the route for listing the card of a client type of user as "/user/client/card", using the {@link listOneCardController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedClient instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
clientRoutes.get("/client/card/", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return listOneCardController.handle(request, response).catch((error)=>{next(error)});
});

//clientRoutes.post("/client/update-cpf", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
//    return updateUserCpfController.handle(request, response).catch((error)=>{next(error)}); 
//});

/**
 * Registers the route for updating the name of a client type of user as "/user/client/update-name", using the {@link updateUserNameController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedClient instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
clientRoutes.post("/client/update-name", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserNameController.handle(request, response).catch((error)=>{next(error)}); 
});

/**
 * Registers the route for updating the email of a client type of user as "/user/client/update-email", using the {@link updateUserEmailController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedClient instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
clientRoutes.post("/client/update-email", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserEmailController.handle(request, response).catch((error)=>{next(error)}); 
});

/**
 * Registers the route for updating the password of a client type of user as "/user/client/update-password", using the {@link updateUserPasswordController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedClient instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
clientRoutes.post("/client/update-password", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserPasswordController.handle(request, response).catch((error)=>{next(error)}); 
});

/**
 * Registers the route for updating the address of a client type of user as "/user/client/update-address", using the {@link updateUserAddressController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedClient instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
clientRoutes.post("/client/update-address", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserAddressController.handle(request, response).catch((error)=>{next(error)}); 
});

/**
 * Registers the route for updating the phone of a client type of user as "/user/client/update-phone", using the {@link updateUserPhoneController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedClient instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
clientRoutes.post("/client/update-phone", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserPhoneController.handle(request, response).catch((error)=>{next(error)}); 
});

/**
 * Registers the route for generating a report of the tickets of a client type of user as "/user/client/generate-ticket-report", using the {@link generateClientTicketReportController.handle} method
 * @param request Request object
 * @param response Response object
 * @param next Tells the express API that there may be a function to execute before or after the request
 * @param ensureAuthenticatedClient instance of the authentication middleware class used to verify that there is indeed an administrator logged in
 * @param error Possible error thrown by either the express API or the Error API created for this project
 */
clientRoutes.get("/client/generate-ticket-report", ensureAuthenticatedClient, (request: Request, response: Response, next: NextFunction)=>{
    return generateClientTicketReportController.handle(request, response).catch((error)=>{next(error)});
});

export { clientRoutes };