import { CardRepository } from "../../db/CardRepository";
import { ListOneCardController } from "./ListOneCardController";
import { ListOneCardUseCase } from "./ListOneCardUseCase";

const cardRepository = new CardRepository();
const listOneCardUseCase = new ListOneCardUseCase(cardRepository);
const listOneCardController = new ListOneCardController(listOneCardUseCase);

export { listOneCardController };