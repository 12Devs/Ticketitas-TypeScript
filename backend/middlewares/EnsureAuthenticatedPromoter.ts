import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";
import { ApiError } from "../errors/ApiError";
import { PromoterRepository } from "../db/PromoterRepository";


async function ensureAuthenticatedPromoter(request: Request, response: Response, next: NextFunction) {
    
    const authHeader = request.headers.authorization; // Pegando o token de dentro do header da requisição;

    if (!authHeader){
        response.status(401).json({message: "Token inválido"});
        return
    }
    
    const [, token] = authHeader.split(" "); //Pegando o token com split;
    try {
        const { sub } = await verify(token, process.env.JWT_SECRET);
        
        const promoterStatus: any = await new PromoterRepository().findStatusByCpf(parseInt(sub));

        
        if (promoterStatus.status == false) {
            next(new ApiError("Promoter suspenso", 401));
        }
        
        request.user = {
            tipo: "promoter",
            cpf: sub,
        }
        next();
    } catch {
        next(new ApiError("Token inválido", 401));
    }  
}

export { ensureAuthenticatedPromoter }