import { Request, Response } from "express";
import { RefreshTokenPromoterUseCase } from "./RefreshTokenPromoterUseCase";

class RefreshTokenPromoterController {

    private refreshTokenPromoterUseCase: RefreshTokenPromoterUseCase;

    public constructor (refreshTokenPromoterUseCase: RefreshTokenPromoterUseCase) {
        this.refreshTokenPromoterUseCase = refreshTokenPromoterUseCase;
    }

    public async handle (request: Request, response: Response): Promise<Response> {
        
        const token = request.body.token ||
        request.headers["x-access-token"] ||
        request.query.token;

        const refreshToken = await this.refreshTokenPromoterUseCase.execute(token);
        return response.json(refreshToken);
    }

}

export { RefreshTokenPromoterController };