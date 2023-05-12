import { CardRepository } from "../../db/CardRepository";
import { UpdateCardController } from "./UpdateCardController";
import { UpdateCardUseCase } from "./UpdateCardUseCase";

const cardRepository = new CardRepository();
const updateCardUseCase = new UpdateCardUseCase(cardRepository);
const updateCardController = new UpdateCardController(updateCardUseCase);

export { updateCardController };