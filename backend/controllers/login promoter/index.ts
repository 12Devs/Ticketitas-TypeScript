import { PromoterRepository } from "../../db/PromoterRepository";
import { LoginPromoterController } from "./LoginPromoterController";
import { LoginPromoterUseCase } from "./LoginPromoterUseCase";


const promoterRepository = new PromoterRepository();
const loginPromoterUseCase = new LoginPromoterUseCase(promoterRepository);
const loginPromoterController = new LoginPromoterController(loginPromoterUseCase);

export { loginPromoterController };