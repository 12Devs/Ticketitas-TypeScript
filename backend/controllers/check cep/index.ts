import { CheckCepController } from "./CheckCepController";
import { CheckCepUseCase } from "./CheckCepUseCase";


const checkCepUseCase = new CheckCepUseCase();
const checkCepController = new CheckCepController(checkCepUseCase);

export { checkCepController };