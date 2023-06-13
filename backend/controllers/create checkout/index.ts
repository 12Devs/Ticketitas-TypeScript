import { CheckoutRepository } from "../../db/CheckoutRepository";
import { EventRepository } from "../../db/EventRepository";
import { CreateCheckoutController } from "./CreateCheckoutController";
import { CreateCheckoutUseCase } from "./CreateCheckoutUseCase";


const checkoutRepository = new CheckoutRepository();
const eventRepository = new EventRepository();
const createCheckoutUseCase = new CreateCheckoutUseCase(checkoutRepository, eventRepository);
const createCheckoutController = new CreateCheckoutController(createCheckoutUseCase);

export { createCheckoutController };