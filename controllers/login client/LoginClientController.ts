import { Request, Response } from "express";
import { createUserToken } from "../../middlewares/CreateUserToken";
import { LoginClientUseCase } from "./LoginClientUseCase";

class LoginClientController {

    private loginClientUseCase: LoginClientUseCase;
    constructor (loginClientUseCase: LoginClientUseCase) {
        this.loginClientUseCase = loginClientUseCase;
    }

    public async handle(request: Request, response: Response){

        const { email, senha } = request.body;
        await this.loginClientUseCase.execute(email, senha).then((client)=>{
            console.log(client)
            createUserToken(client, request, response);
        });
        
    }
}

export { LoginClientController };