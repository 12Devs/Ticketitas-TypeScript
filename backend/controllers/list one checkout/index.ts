import { CheckoutRepository } from "../../db/CheckoutRepository";
import { EnderecoUserRepository } from "../../db/EnderecoUserRepository";
import { ListOneCheckoutController } from "./ListOneCheckoutController";
import { ListOneCheckoutUseCase } from "./ListOneCheckoutUseCase";


const checkoutRepository = new CheckoutRepository();
const enderecouserRepository = new EnderecoUserRepository();
const listOneCheckoutUseCase = new ListOneCheckoutUseCase(checkoutRepository, enderecouserRepository);
const listOneCheckoutController = new ListOneCheckoutController(listOneCheckoutUseCase);

export { listOneCheckoutController };