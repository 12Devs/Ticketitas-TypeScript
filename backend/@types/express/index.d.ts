declare namespace Express {
    export interface Request {
        user?: {
            tipo: string,
            cpf: number;
        }
    }
}

