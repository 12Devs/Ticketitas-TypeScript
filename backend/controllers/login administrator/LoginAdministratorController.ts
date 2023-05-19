import { Request, Response } from "express";
import { LoginAdministratorUseCase } from "./LoginAdministratorUseCase";

class LoginAdministratorController {

    private loginAdministratorUseCase: LoginAdministratorUseCase;
    constructor (loginAdministratorUseCase: LoginAdministratorUseCase) {
        this.loginAdministratorUseCase = loginAdministratorUseCase;
    }

    public async handle(request: Request, response: Response){

        const { email, senha } = request.body;
        const authenticateInfo = await this.loginAdministratorUseCase.execute(email, senha);
        
        return response.json({authenticateInfo});
    }
}

export { LoginAdministratorController };