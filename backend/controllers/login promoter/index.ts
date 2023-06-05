import { PromoterRegistrationRequestRepository } from "../../db/PromoterRegistrationRequestRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { TokenPromoterRepository } from "../../db/TokenPromoterRepository";
import { LoginPromoterController } from "./LoginPromoterController";
import { LoginPromoterUseCase } from "./LoginPromoterUseCase";

const promoterRepository = new PromoterRepository();
const tokenPromoterRepository = new TokenPromoterRepository();
const promoterRegistrationRequestRepository = new PromoterRegistrationRequestRepository();
const loginPromoterUseCase = new LoginPromoterUseCase(promoterRepository, tokenPromoterRepository, promoterRegistrationRequestRepository);
const loginPromoterController = new LoginPromoterController(loginPromoterUseCase);

export { loginPromoterController };