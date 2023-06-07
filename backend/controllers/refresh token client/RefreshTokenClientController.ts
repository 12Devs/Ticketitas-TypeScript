import { Request, Response } from "express";
import { RefreshTokenClientUseCase } from "./RefreshTokenClientUseCase";

/**
 * Refresh token client controller class
 * @date 6/6/2023 - 10:37:12 PM
 *
 * @class RefreshTokenClientController
 * @typedef {RefreshTokenClientController}
 */
class RefreshTokenClientController {
    
    /**
     * Creates an instance of {@link RefreshTokenClientController}.
     * @date 6/6/2023 - 10:37:16 PM
     *
     * @private
     * @type {RefreshTokenClientUseCase}
     */
    private refreshTokenClientUseCase: RefreshTokenClientUseCase;
    
    /**
     * Creates an instance of RefreshTokenClientController.
     * @date 6/6/2023 - 10:37:23 PM
     *
     * @constructor
     * @public
     * @param {RefreshTokenClientUseCase} refreshTokenClientUseCase
     */
    public constructor (refreshTokenClientUseCase: RefreshTokenClientUseCase) {
        this.refreshTokenClientUseCase = refreshTokenClientUseCase;
    }
    
    /**
     * Manipulate method for make a refresh token client
     * @date 6/6/2023 - 10:37:26 PM
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

        const refreshToken = await this.refreshTokenClientUseCase.execute(token);
        return response.json(refreshToken);
    }

}

export { RefreshTokenClientController };