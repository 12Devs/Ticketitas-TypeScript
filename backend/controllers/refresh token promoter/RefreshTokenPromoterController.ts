import { Request, Response } from "express";
import { RefreshTokenPromoterUseCase } from "./RefreshTokenPromoterUseCase";

/**
 * Refresh token promoter controller class
 * @date 6/6/2023 - 10:38:02 PM
 *
 * @class RefreshTokenPromoterController
 * @typedef {RefreshTokenPromoterController}
 */
class RefreshTokenPromoterController {
    
    /**
     * Creates an instance of {@link RefreshTokenPromoterController}.
     * @date 6/6/2023 - 10:38:10 PM
     *
     * @private
     * @type {RefreshTokenPromoterUseCase}
     */
    private refreshTokenPromoterUseCase: RefreshTokenPromoterUseCase;
    
    /**
     * Creates an instance of RefreshTokenPromoterController.
     * @date 6/6/2023 - 10:38:14 PM
     *
     * @constructor
     * @public
     * @param {RefreshTokenPromoterUseCase} refreshTokenPromoterUseCase
     */
    public constructor (refreshTokenPromoterUseCase: RefreshTokenPromoterUseCase) {
        this.refreshTokenPromoterUseCase = refreshTokenPromoterUseCase;
    }
    
    /**
     * Manipulate method for make a refresh token promoter
     * @date 6/6/2023 - 10:38:18 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {Promise<Response>}
     */
    public async handle (request: Request, response: Response): Promise<Response> {
        
        const token = request.body.token ||
        request.headers["x-access-token"] ||
        request.query.token;

        const refreshToken = await this.refreshTokenPromoterUseCase.execute(token);
        return response.json(refreshToken);
    }

}

export { RefreshTokenPromoterController };