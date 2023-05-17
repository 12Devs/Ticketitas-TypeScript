import { Request, Response } from "express";
import { RefreshTokenAdministratorUseCase } from "./RefreshTokenAdministratorUseCase";

class RefreshTokenAdministratorController {

    private refreshTokenAdministratorUseCase: RefreshTokenAdministratorUseCase;

    public constructor (refreshTokenAdministratorUseCase: RefreshTokenAdministratorUseCase) {
        this.refreshTokenAdministratorUseCase = refreshTokenAdministratorUseCase;
    }

    public async handle (request: Request, response: Response): Promise<Response> {
        
        const token = request.body.token ||
        request.headers["x-access-token"] ||
        request.query.token;

        const refreshToken = await this.refreshTokenAdministratorUseCase.execute(token);
        return response.json(refreshToken);
    }

}

export { RefreshTokenAdministratorController };