import { Request, Response } from "express";
import { RefreshTokenClientUseCase } from "./RefreshTokenClientUseCase";

class RefreshTokenClientController {

    private refreshTokenClientUseCase: RefreshTokenClientUseCase;

    public constructor (refreshTokenClientUseCase: RefreshTokenClientUseCase) {
        this.refreshTokenClientUseCase = refreshTokenClientUseCase;
    }

    public async handle (request: Request, response: Response): Promise<Response> {
        
        const token = request.body.token ||
        request.headers["x-access-token"] ||
        request.query.token;

        const refreshToken = await this.refreshTokenClientUseCase.execute(token);
        return response.json(refreshToken);
    }

}

export { RefreshTokenClientController };