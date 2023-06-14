import { PromoterRepository } from "../../db/PromoterRepository";
import { ListAllPromotersController } from "./ListAllPromotersController";
import { ListAllPromotersUseCase } from "./ListAllPromotersUseCase";


const promoterRepository = new PromoterRepository();
const listAllPromotersUseCase = new ListAllPromotersUseCase(promoterRepository);
const listAllPromotersController = new ListAllPromotersController(listAllPromotersUseCase);

export { listAllPromotersController };