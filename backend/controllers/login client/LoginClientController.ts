import { Request, Response } from "express";
import { LoginClientUseCase } from "./LoginClientUseCase";

class LoginClientController {

    private loginClientUseCase: LoginClientUseCase;
    constructor (loginClientUseCase: LoginClientUseCase) {
        this.loginClientUseCase = loginClientUseCase;
    }

    public async handle(request: Request, response: Response){

        const { email, senha } = request.body;
        const authenticateInfo = await this.loginClientUseCase.execute(email, senha);
        
        return response.json({authenticateInfo});
    }
}

export { LoginClientController };