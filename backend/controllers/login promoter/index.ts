import { PromoterRepository } from "../../db/PromoterRepository";
import { TokenPromoterRepository } from "../../db/TokenPromoterRepository";
import { LoginPromoterController } from "./LoginPromoterController";
import { LoginPromoterUseCase } from "./LoginPromoterUseCase";


const promoterRepository = new PromoterRepository();
const tokenPromoterRepository = new TokenPromoterRepository();
const loginPromoterUseCase = new LoginPromoterUseCase(promoterRepository, tokenPromoterRepository);
const loginPromoterController = new LoginPromoterController(loginPromoterUseCase);

export { loginPromoterController };