import { PromoterRepository } from "../../db/PromoterRepository";
import { TokenPromoterRepository } from "../../db/TokenPromoterRepository";
import { RefreshTokenPromoterController } from "./RefreshTokenPromoterController";
import { RefreshTokenPromoterUseCase } from "./RefreshTokenPromoterUseCase";


const tokenPromoterRepository = new TokenPromoterRepository();
const promoterRepository = new PromoterRepository()
const refreshTokenPromoterUseCase = new RefreshTokenPromoterUseCase(tokenPromoterRepository, promoterRepository);
const refreshTokenPromoterController = new RefreshTokenPromoterController(refreshTokenPromoterUseCase);

export { refreshTokenPromoterController };