import { Request, Response } from "express";
import { LoginPromoterUseCase } from "./LoginPromoterUseCase";

class LoginPromoterController {

    private loginPromoterUseCase: LoginPromoterUseCase;
    constructor (loginPromoterUseCase: LoginPromoterUseCase) {
        this.loginPromoterUseCase = loginPromoterUseCase;
    }

    public async handle(request: Request, response: Response){

        const { email, senha } = request.body;
        const authenticateInfo = await this.loginPromoterUseCase.execute(email, senha);
        
        return response.json({authenticateInfo});
    }
}

export { LoginPromoterController };