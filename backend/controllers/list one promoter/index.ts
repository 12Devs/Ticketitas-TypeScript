import { PromoterRepository } from "../../db/PromoterRepository";
import { EnderecoUserRepository } from "../../db/EnderecoUserRepository";
import { ListOnePromoterController } from "./ListOnePromoterController";
import { ListOnePromoterUseCase } from "./ListOnePromoterUseCase";


const promoterRepository = new PromoterRepository();
const enderecouserRepository = new EnderecoUserRepository();
const listOnePromoterUseCase = new ListOnePromoterUseCase(promoterRepository, enderecouserRepository);
const listOnePromoterController = new ListOnePromoterController(listOnePromoterUseCase);

export { listOnePromoterController };