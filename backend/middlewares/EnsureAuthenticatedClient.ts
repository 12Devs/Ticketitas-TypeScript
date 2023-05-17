import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";
import { ApiError } from "../errors/ApiError";
import auth from "../config/auth";


async function ensureAuthenticatedClient(request: Request, response: Response, next: NextFunction) {
    
    const authHeader = request.headers.authorization; // Pegando o token de dentro do header da requisição;

    if (!authHeader){
        response.status(401).json({message: "Token inválido"});
        return
    }

    const [, token] = authHeader.split(" "); //Pegando o token com split;
    try {
        const { sub } = await verify(token, auth.secretToken);

        request.user = {
            tipo: "client",
            cpf: sub
        }
        next();
    } catch {
        next(new ApiError("Token inválido", 401));
    }  
}

export { ensureAuthenticatedClient }