import { Request, Response } from "express";
import { createUserToken } from "../../middlewares/CreateUserToken";
import { LoginPromoterUseCase } from "./LoginPromoterUseCase";

class LoginPromoterController {

    private loginPromoterUseCase: LoginPromoterUseCase;
    constructor (loginPromoterUseCase: LoginPromoterUseCase) {
        this.loginPromoterUseCase = loginPromoterUseCase;
    }

    public async handle(request: Request, response: Response){

        const { email, senha } = request.body;
        await this.loginPromoterUseCase.execute(email, senha).then((promoter)=>{
            console.log(promoter)
            createUserToken(promoter, request, response);
        });
        
    }
}

export { LoginPromoterController };