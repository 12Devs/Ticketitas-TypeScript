import { Router } from "express";
import { clientRoutes } from "./ClientRoutes";
import { eventRoutes } from "./EventRoutes";
import { enderecoRoutes } from "./EnderecoRoutes";

const router = Router();

router.use('/user', clientRoutes);
router.use('/event', eventRoutes);
router.use('/endereco', enderecoRoutes);

export {router};