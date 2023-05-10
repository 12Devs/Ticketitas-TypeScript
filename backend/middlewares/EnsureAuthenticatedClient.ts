import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";
import { ApiError } from "../errors/ApiError";
import { TokenClientRepository } from "../db/TokenClientRepository";
import auth from "../config/auth";


async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    
    const authHeader = request.headers.authorization; // Pegando o token de dentro do header da requisição;
    const tokenClientRepository = new TokenClientRepository();


    if (!authHeader){
        response.status(401).json({message: "Token inválido"});
        return
    }

    const [, token] = authHeader.split(" "); //Pegando o token com split;
    try {
        const { sub } = await verify(token, auth.secretRefreshToken);
        const tokenClient: any = await tokenClientRepository.findByCpfAndRefreshToken(sub, token);
        if(!tokenClient) {
            next(new ApiError("Client nã existe", 401));
        }
        request.user = {
            cpf: tokenClient.clientCpf
        }
        next();
    } catch {
        next(new ApiError("Token inválido", 401));
    }  
}

export { ensureAuthenticated }