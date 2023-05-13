import { TokenPromoterRepository } from "../../db/TokenPromoterRepository";
import { RefreshTokenPromoterController } from "./RefreshTokenPromoterController";
import { RefreshTokenPromoterUseCase } from "./RefreshTokenPromoterUseCase";


const tokenPromoterRepository = new TokenPromoterRepository();
const refreshTokenPromoterUseCase = new RefreshTokenPromoterUseCase(tokenPromoterRepository);
const refreshTokenPromoterController = new RefreshTokenPromoterController(refreshTokenPromoterUseCase);

export { refreshTokenPromoterController };