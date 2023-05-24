import { TokenAdministratorRepository } from "../../db/TokenAdministratorRepository";
import { RefreshTokenAdministratorController } from "./RefreshTokenAdministratorController";
import { RefreshTokenAdministratorUseCase } from "./RefreshTokenAdministratorUseCase";


const tokenAdministratorRepository = new TokenAdministratorRepository();
const refreshTokenAdministratorUseCase = new RefreshTokenAdministratorUseCase(tokenAdministratorRepository);
const refreshTokenAdministratorController = new RefreshTokenAdministratorController(refreshTokenAdministratorUseCase);



export { refreshTokenAdministratorController };