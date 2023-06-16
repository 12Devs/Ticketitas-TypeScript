import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";
import { ApiError } from "../errors/ApiError";

async function ensureAuthenticatedSuperAdministrator(request: Request, response: Response, next: NextFunction) {
    
    const authHeader = request.headers.authorization; // Pegando o token de dentro do header da requisição;

    if (!authHeader){
        response.status(401).json({message: "Token inválido"});
        return
    }

    const [, token] = authHeader.split(" "); //Pegando o token com split;
    try {
        const { sub }: any = await verify(token, process.env.JWT_SECRET_SUPER_ADMINISTRATOR as string);

        request.user = {
            tipo: "superAdministrator",
            cpf: sub
        }
        next();
    } catch {
        next(new ApiError("Token inválido", 401));
    }  
}

export { ensureAuthenticatedSuperAdministrator }