import { Request, Response } from "express";
import { RefreshTokenAdministratorUseCase } from "./RefreshTokenAdministratorUseCase";

/**
 * Refresh token administrator controller class
 * @date 6/6/2023 - 10:36:21 PM
 *
 * @class RefreshTokenAdministratorController
 * @typedef {RefreshTokenAdministratorController}
 */
class RefreshTokenAdministratorController {
    
    /**
     * Creates an instance of {@link RefreshTokenAdministratorController}.
     * @date 6/6/2023 - 10:36:25 PM
     *
     * @private
     * @type {RefreshTokenAdministratorUseCase}
     */
    private refreshTokenAdministratorUseCase: RefreshTokenAdministratorUseCase;
    
    /**
     * Creates an instance of RefreshTokenAdministratorController.
     * @date 6/6/2023 - 10:36:29 PM
     *
     * @constructor
     * @public
     * @param {RefreshTokenAdministratorUseCase} refreshTokenAdministratorUseCase
     */
    public constructor (refreshTokenAdministratorUseCase: RefreshTokenAdministratorUseCase) {
        this.refreshTokenAdministratorUseCase = refreshTokenAdministratorUseCase;
    }
    
    /**
     * Manipulate method for make a refresh token administrator
     * @date 6/6/2023 - 10:36:34 PM
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

        const refreshToken = await this.refreshTokenAdministratorUseCase.execute(token);
        return response.json(refreshToken);
    }

}

export { RefreshTokenAdministratorController };