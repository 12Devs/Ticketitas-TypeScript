import { NextFunction, Request, Response, Router } from 'express';
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

const promoterRoutes = Router();

promoterRoutes.post("/promoter", (request: Request, response: Response, next: NextFunction)=>{
    return createPromoterController.handle(request, response).catch((error)=>{next(error)});   
});

promoterRoutes.post("/promoter/login", (request: Request, response: Response, next: NextFunction)=>{
    return loginPromoterController.handle(request, response).catch((error)=>{next(error)});
});

promoterRoutes.post("/promoter/change-password", (request: Request, response: Response, next: NextFunction)=>{
    return changePasswordPromoterController.handle(request, response).catch((error)=>{next(error)});
});

promoterRoutes.post("/promoter/new-password", (request: Request, response: Response, next: NextFunction)=>{
    return newPasswordPromoterController.handle(request, response).catch((error)=>{next(error)});
});

promoterRoutes.post("/promoter/refresh-token", (request: Request, response: Response, next: NextFunction)=>{
    return refreshTokenPromoterController.handle(request, response).catch((error)=>{next(error)});
});

promoterRoutes.patch("/promoter/avatar", ensureAuthenticatedPromoter, imageUpload.single("avatar"), (request: Request, response: Response, next: NextFunction)=>{
    return updateAvatarController.handle(request, response).catch((error)=>{next(error)}); 
});

promoterRoutes.post("/promoter/update-cpf", ensureAuthenticatedPromoter, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserCpfController.handle(request, response).catch((error)=>{next(error)}); 
});

promoterRoutes.post("/promoter/update-name", ensureAuthenticatedPromoter, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserNameController.handle(request, response).catch((error)=>{next(error)}); 
});

promoterRoutes.post("/promoter/update-email", ensureAuthenticatedPromoter, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserEmailController.handle(request, response).catch((error)=>{next(error)}); 
});

promoterRoutes.post("/promoter/update-password", ensureAuthenticatedPromoter, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserPasswordController.handle(request, response).catch((error)=>{next(error)}); 
});

promoterRoutes.post("/promoter/update-address", ensureAuthenticatedPromoter, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserAddressController.handle(request, response).catch((error)=>{next(error)}); 
});

promoterRoutes.post("/promoter/update-phone", ensureAuthenticatedPromoter, (request: Request, response: Response, next: NextFunction)=>{
    return updateUserPhoneController.handle(request, response).catch((error)=>{next(error)}); 
});


export { promoterRoutes };