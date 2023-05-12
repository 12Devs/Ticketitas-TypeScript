import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";
import { ApiError } from "../errors/api.errors";
import { AdministratorRepository } from "../db/AdministratorRepository";


async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    
    const authHeader = request.headers.authorization; // Pegando o token de dentro do header da requisição;

    if (!authHeader){
        response.status(401).json({message: "Token inválido"});
        return
    }

    const [, token] = authHeader.split(" "); //Pegando o token com split;
    try {
        const { sub } = await verify(token, "vamoTirar10NessaBagaca");
        const administratorRepository = new AdministratorRepository();
        const administratorCpf = await administratorRepository.findByCpf(sub);
        if(!administratorCpf) {
            next(new ApiError("Administrator nã existe", 401));
        }
        next();
    } catch {
        next(new ApiError("Token inválido", 401));
    }  
}

export { ensureAuthenticated }