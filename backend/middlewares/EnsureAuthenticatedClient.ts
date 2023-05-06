import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";
import { ApiError } from "../errors/api.errors";
import { ClientRepository } from "../db/ClientRepository";


async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    
    const authHeader = request.headers.authorization; // Pegando o token de dentro do header da requisição;

    if (!authHeader){
        response.status(401).json({message: "Token inválido"});
        return
    }

    const [, token] = authHeader.split(" "); //Pegando o token com split;
    try {
        const { sub } = await verify(token, "vamoTirar10NessaBagaca");
        const clientRepository = new ClientRepository();
        const clientCpf = await clientRepository.findByCpf(sub);
        if(!clientCpf) {
            next(new ApiError("Client nã existe", 401));
        }
        request.user = {
            cpf: clientCpf
        }
        next();
    } catch {
        next(new ApiError("Token inválido", 401));
    }  
}

export { ensureAuthenticated }