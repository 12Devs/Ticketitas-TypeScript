import { TokenClientRepository } from "../../db/TokenClientRepository";
import { RefreshTokenClientController } from "./RefreshTokenClientController";
import { RefreshTokenClientUseCase } from "./RefreshTokenClientUseCase";


const tokenClientRepository = new TokenClientRepository();
const refreshTokenClientUseCase = new RefreshTokenClientUseCase(tokenClientRepository);
const refreshTokenClietController = new RefreshTokenClientController(refreshTokenClientUseCase);

export { refreshTokenClietController };