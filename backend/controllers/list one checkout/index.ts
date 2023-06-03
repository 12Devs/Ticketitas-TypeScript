import { CheckoutRepository } from "../../db/CheckoutRepository";
import { ListOneCheckoutController } from "./ListOneCheckoutController";
import { ListOneCheckoutUseCase } from "./ListOneCheckoutUseCase";

const checkoutRepository = new CheckoutRepository();
const listOneCheckoutUseCase = new ListOneCheckoutUseCase(checkoutRepository);
const listOneCheckoutController = new ListOneCheckoutController(listOneCheckoutUseCase);

export { listOneCheckoutController };