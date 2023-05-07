import { Request, Response } from "express";
import { createUserToken } from "../../middlewares/CreateUserToken";
import { LoginAdministratorUseCase } from "./LoginAdministratorUseCase";

class LoginAdministratorController {

    private loginAdministratorUseCase: LoginAdministratorUseCase;
    constructor (loginAdministratorUseCase: LoginAdministratorUseCase) {
        this.loginAdministratorUseCase = loginAdministratorUseCase;
    }

    public async handle(request: Request, response: Response){

        const { email, senha } = request.body;
        await this.loginAdministratorUseCase.execute(email, senha).then((administrator)=>{
            console.log(administrator)
            createUserToken(administrator, request, response);
        });
        
    }
}

export { LoginAdministratorController };