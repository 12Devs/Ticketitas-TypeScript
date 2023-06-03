import { CheckoutRepository } from "../../db/CheckoutRepository";
import { CreateCheckoutController } from "./CreateCheckoutController";
import { CreateCheckoutUseCase } from "./CreateCheckoutUseCase";


const checkoutRepository = new CheckoutRepository();
const createCheckoutUseCase = new CreateCheckoutUseCase(checkoutRepository);
const createCheckoutController = new CreateCheckoutController(createCheckoutUseCase);

export { createCheckoutController };